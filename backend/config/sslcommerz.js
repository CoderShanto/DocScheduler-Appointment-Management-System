import SSLCommerzPayment from "sslcommerz-lts";

export const getSSLCommerz = () => {
  const store_id = process.env.SSLC_STORE_ID;
  const store_passwd = process.env.SSLC_STORE_PASS;
  const is_live = process.env.SSLC_IS_LIVE === "true";
  return new SSLCommerzPayment(store_id, store_passwd, is_live);
};
