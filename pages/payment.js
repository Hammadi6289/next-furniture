import CheckoutWizard from "@/components/CheckoutWizard";
import Layout from "@/components/Layout";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required to proceed");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form
        className="mx-auto max-w-screen-md bg-white shadow-md rounded-lg p-6"
        onSubmit={submitHandler}
      >
        <h1 className="mb-6 text-2xl font-semibold text-center">
          Payment Method
        </h1>
        <div className="grid gap-4 mb-6">
          {["PayPal", "Stripe", "VISA", "CashOnDelivery"].map((payment) => (
            <div key={payment} className="flex items-center">
              <input
                name="paymentMethod"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                id={payment}
                type="radio"
                checked={selectedPaymentMethod === payment}
                onChange={() => setSelectedPaymentMethod(payment)}
              />
              <label
                className="ml-3 block text-sm font-medium text-gray-700"
                htmlFor={payment}
              >
                {payment}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => router.push("/shipping")}
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400"
          >
            Back
          </button>
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}

PaymentScreen.auth = true;
