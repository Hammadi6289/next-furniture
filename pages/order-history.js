import Layout from "@/components/Layout";
import { getError } from "@/utils/error";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: "" };
    default:
      return state;
  }
}

function OrderHistoryScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);
  return (
    <Layout title="Order History">
      <h1 className="mb-4 text-3xl font-bold">Order History</h1>
      {loading ? (
        <div className="text-lg text-gray-600">Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed">
            <thead className="border-b bg-gray-100">
              <tr>
                <th className="px-5 text-left">Order #</th>
                <th className="p-5 text-left">Order Date</th>
                <th className="p-5 text-left">Total Price</th>
                <th className="p-5 text-left">Status</th>
                <th className="p-5 text-left">Delivered</th>
                <th className="p-5 text-left">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-100">
                  <td className="p-5 ">{order._id.substring(18, 24)}</td>
                  <td className="p-5 ">{order.createdAt.substring(0, 10)}</td>
                  <td className="p-5 ">${order.totalPrice}</td>
                  <td className="p-5 ">
                    {order.isPaid ? (
                      <span className="text-green-600">
                        {order.paidAt.substring(0, 10)}
                      </span>
                    ) : (
                      <span className="text-red-500">Not paid</span>
                    )}
                  </td>
                  <td className="p-5 ">
                    {order.isDelivered ? (
                      <span className="text-green-600">
                        {order.deliveredAt.substring(0, 10)}
                      </span>
                    ) : (
                      <span className="text-orange-400">In-Transit</span>
                    )}
                  </td>
                  <td className="p-5 ">
                    <Link href={`/order/${order._id}`} passHref>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}

OrderHistoryScreen.auth = true;
export default OrderHistoryScreen;
