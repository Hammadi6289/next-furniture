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
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const AdminOrderScreen = () => {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/orders`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title="Admin Dashboard">
      <div className="grid md:grid-cols-4 md:gap-5 p-4">
        <nav className=" text-white p-4 rounded-md">
          <ul className="space-y-6">
            <li>
              <Link href="/admin/dashboard" className="hover:text-gray-400">
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/orders"
                className="font-bold text-blue-700 hover:text-gray-400"
              >
                Orders
              </Link>
            </li>
            <li>
              <Link href="/admin/products" className="hover:text-gray-400">
                Catalogs
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="hover:text-gray-400">
                Users
              </Link>
            </li>
          </ul>
        </nav>
        <div className="overflow-x-auto md:col-span-3">
          <h1 className="mb-6 mt-4 text-3xl font-bold text-gray-800 pb-2 border-b-2 border-gray-300 shadow-sm">
            Orders
          </h1>

          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : error ? (
            <div className="alert-error p-4 mb-4 text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "ID",
                      "USER",
                      "DATE",
                      "TOTAL",
                      "PAID",
                      "DELIVERED",
                      "ACTION",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order._id.substring(18, 24)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.user ? order.user.name : "DELETED USER"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${order.totalPrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.isPaid
                          ? order.paidAt.substring(0, 10)
                          : "not paid"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.isDelivered
                          ? order.deliveredAt.substring(0, 10)
                          : "not delivered"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link
                          href={`/order/${order._id}`}
                          passHref
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

AdminOrderScreen.auth = { adminOnly: true };

export default AdminOrderScreen;
