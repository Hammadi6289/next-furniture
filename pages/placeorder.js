import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { Store } from "../utils/Store";

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      <div className="flex justify-center mb-8">
        <h1 className="text-2xl font-bold">Place Order</h1>
      </div>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Your cart is empty.</p>
          <Link href="/" className="text-blue-500 hover:underline">
            Go shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5 mb-5">
              <h2 className="mb-2 text-lg font-semibold">Shipping Address</h2>
              <p>
                {shippingAddress.fullName}, {shippingAddress.address},{" "}
                {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </p>
              <Link href="/shipping" className="text-blue-500 hover:underline">
                Edit
              </Link>
            </div>
            <div className="card p-5 mb-5">
              <h2 className="mb-2 text-lg font-semibold">Payment Method</h2>
              <p>{paymentMethod}</p>
              <Link href="/payment" className="text-blue-500 hover:underline">
                Edit
              </Link>
            </div>
            <div className="card p-5 mb-5">
              <h2 className="mb-2 text-lg font-semibold">Order Items</h2>
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-5 py-3 text-left border-b">Item</th>
                    <th className="px-5 py-3 text-right border-b">Quantity</th>
                    <th className="px-5 py-3 text-right border-b">Price</th>
                    <th className="px-5 py-3 text-right border-b">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td className="px-5 py-3">
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={150}
                            height={150}
                            className="mr-2"
                          />
                          {item.name}
                        </Link>
                      </td>
                      <td className="px-5 py-3 text-right">{item.quantity}</td>
                      <td className="px-5 py-3 text-right">PKR {item.price}</td>
                      <td className="px-5 py-3 text-right">
                        PKR {item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link href="/cart" className="text-blue-500 hover:underline">
                Edit
              </Link>
            </div>
          </div>
          <div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg font-semibold">Order Summary</h2>
              <ul>
                <li className="mb-2 flex justify-between">
                  <div>Items</div>
                  <div>PKR {itemsPrice}</div>
                </li>
                <li className="mb-2 flex justify-between">
                  <div>Tax</div>
                  <div>PKR{taxPrice}</div>
                </li>
                <li className="mb-2 flex justify-between">
                  <div>Shipping</div>
                  <div>PKR{shippingPrice}</div>
                </li>
                <li className="mb-2 flex justify-between">
                  <div>Total</div>
                  <div>PKR{totalPrice}</div>
                </li>
                <li>
                  <button
                    disabled={loading}
                    onClick={placeOrderHandler}
                    className="primary-button w-full mt-4"
                  >
                    {loading ? "Loading..." : "Place Order"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

PlaceOrderScreen.auth = true;
