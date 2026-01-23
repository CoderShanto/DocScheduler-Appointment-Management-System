import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
  ipnPayment,
  getPaymentStatus,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/init", authUser, initPayment);

router.post("/success", successPayment);
router.post("/fail", failPayment);
router.post("/cancel", cancelPayment);
router.post("/ipn", ipnPayment);

router.get("/status/:tran_id", getPaymentStatus);

export default router;
