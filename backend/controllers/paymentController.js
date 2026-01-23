import crypto from "crypto";
import appointmentModel from "../models/appointmentModel.js";
import { getSSLCommerz } from "../config/sslcommerz.js";

// helper: generate unique transaction id
const genTranId = () => "TRX_" + crypto.randomBytes(8).toString("hex");

// ✅ 1) INIT payment: frontend calls this
export const initPayment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const { userId } = req; // comes from auth middleware

    if (!appointmentId) {
      return res.json({ success: false, message: "appointmentId is required" });
    }

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) return res.json({ success: false, message: "Appointment not found" });

    if (appointment.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    if (appointment.cancelled) {
      return res.json({ success: false, message: "Appointment cancelled" });
    }

    if (appointment.payment) {
      return res.json({ success: false, message: "Already paid" });
    }

    // IMPORTANT env checks
    const BASE_URL = process.env.BASE_URL;     // https://xxxx.ngrok-free.app
    const CLIENT_URL = process.env.CLIENT_URL; // http://localhost:5173
    if (!BASE_URL) return res.json({ success: false, message: "BASE_URL missing in backend .env" });
    if (!CLIENT_URL) return res.json({ success: false, message: "CLIENT_URL missing in backend .env" });

    // generate transaction id & store
    const tran_id = genTranId();
    appointment.tran_id = tran_id;
    appointment.paymentStatus = "PENDING";
    await appointment.save();

    const sslcz = getSSLCommerz();

    const data = {
      total_amount: appointment.amount,
      currency: "BDT",
      tran_id,

      // ✅ MUST be HTTPS (ngrok) to avoid Mixed Content
      success_url: `${BASE_URL}/api/payment/success`,
      fail_url: `${BASE_URL}/api/payment/fail`,
      cancel_url: `${BASE_URL}/api/payment/cancel`,
      ipn_url: `${BASE_URL}/api/payment/ipn`,

      shipping_method: "NO",
      product_name: "Doctor Appointment",
      product_category: "Service",
      product_profile: "general",

      cus_name: appointment.userData?.name || "Customer",
      cus_email: appointment.userData?.email || "customer@example.com",
      cus_add1: appointment.userData?.address?.line1 || "Dhaka",
      cus_add2: appointment.userData?.address?.line2 || "",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: appointment.userData?.phone || "01700000000",
    };

    const apiResponse = await sslcz.init(data);

    return res.json({
      success: true,
      message: "Redirect to payment gateway",
      tran_id,
      gatewayUrl: apiResponse.GatewayPageURL,
    });
  } catch (error) {
    console.log("initPayment error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ 2) SUCCESS callback: SSLCommerz POST করবে এখানে
export const successPayment = async (req, res) => {
  try {
    const { tran_id, val_id } = req.body;

    const appointment = await appointmentModel.findOne({ tran_id });
    if (!appointment) {
      return res.redirect(`${process.env.CLIENT_URL}/payment/fail`);
    }

    const sslcz = getSSLCommerz();
    await sslcz.validate({ val_id }); // validates with SSLCommerz server

    appointment.payment = true;
    appointment.paymentStatus = "SUCCESS";
    appointment.val_id = val_id;
    await appointment.save();

    return res.redirect(`${process.env.CLIENT_URL}/payment/success?tran_id=${tran_id}`);
  } catch (error) {
    console.log("successPayment error:", error);
    return res.redirect(`${process.env.CLIENT_URL}/payment/fail`);
  }
};

// ✅ 3) FAIL callback
export const failPayment = async (req, res) => {
  try {
    const { tran_id } = req.body;

    const appointment = await appointmentModel.findOne({ tran_id });
    if (appointment) {
      appointment.paymentStatus = "FAILED";
      await appointment.save();
    }

    return res.redirect(`${process.env.CLIENT_URL}/payment/fail?tran_id=${tran_id}`);
  } catch (error) {
    console.log("failPayment error:", error);
    return res.redirect(`${process.env.CLIENT_URL}/payment/fail`);
  }
};

// ✅ 4) CANCEL callback
export const cancelPayment = async (req, res) => {
  try {
    const { tran_id } = req.body;

    const appointment = await appointmentModel.findOne({ tran_id });
    if (appointment) {
      appointment.paymentStatus = "CANCELLED";
      await appointment.save();
    }

    return res.redirect(`${process.env.CLIENT_URL}/payment/cancel?tran_id=${tran_id}`);
  } catch (error) {
    console.log("cancelPayment error:", error);
    return res.redirect(`${process.env.CLIENT_URL}/payment/cancel`);
  }
};

// ✅ 5) IPN endpoint (optional)
export const ipnPayment = async (req, res) => {
  // You can log req.body if you want
  return res.status(200).send("IPN received");
};

// ✅ 6) Status API for frontend success page
export const getPaymentStatus = async (req, res) => {
  try {
    const { tran_id } = req.params;

    const appointment = await appointmentModel.findOne({ tran_id });
    if (!appointment) return res.status(404).json({ success: false, message: "Not found" });

    res.json({
      success: true,
      tran_id: appointment.tran_id,
      payment: appointment.payment,
      paymentStatus: appointment.paymentStatus,
      amount: appointment.amount,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
