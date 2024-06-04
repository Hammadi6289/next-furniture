import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function OrderScreen() {
  // Extract order ID from router query
  const { query } = useRouter();
  const orderId = query.id;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, orderId]);

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  return (
    <Layout title={`Order ${orderId}`}>
      <h1 className="mb-8 text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 rounded-lg shadow-md">
        {`Order No. ${orderId}`}
      </h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-7 mb-5">
              <h2 className="mb-2 text-lg font-semibold">Shipping Address</h2>
              <p>
                {shippingAddress.fullName}, {shippingAddress.address},{" "}
                {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </p>
              {isDelivered ? (
                <div className="alert-success">Delivered at {deliveredAt}</div>
              ) : (
                <div className="alert-error">Not delivered</div>
              )}
            </div>

            <div className="card p-7 mb-5">
              <h2 className="mb-2 text-lg font-semibold">Payment Method</h2>
              <p>{paymentMethod}</p>
              {isPaid ? (
                <div className="alert-success">Paid at {paidAt}</div>
              ) : (
                <div className="alert-error">Not paid</div>
              )}
            </div>

            <div className="card p-7 overflow-x-auto">
              <h2 className="mb-2 text-lg font-semibold">Order Items</h2>
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="px-5 py-3 text-left">Item</th>
                    <th className="px-5 py-3 text-right">Quantity</th>
                    <th className="px-5 py-3 text-right">Price</th>
                    <th className="px-5 py-3 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
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
                      <td className="px-5 py-3 text-right">PKR{item.price}</td>
                      <td className="px-5 py-3 text-right">
                        PKR{item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg font-semibold">Order Summary</h2>
              <ul>
                <li className="mb-2 flex justify-between">
                  <div>Items</div>
                  <div>PKR{itemsPrice}</div>
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
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

OrderScreen.auth = true;
export default OrderScreen;
