import axios from "axios";
import React, { useEffect, useReducer } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
const AdminProductScreen = () => {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/products`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, []);
  return (
    <Layout title="Admin Products">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="bg-gray-100 p-5 rounded-lg shadow-lg">
          <ul>
            <li className="mb-2">
              <Link href="/admin/dashboard" className=" hover:text-blue-700">
                Dashboard
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/admin/orders" className=" hover:text-blue-700">
                Orders
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/admin/products" className="font-bold text-blue-700">
                Catalogs
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/admin/users" className=" hover:text-blue-700">
                Users
              </Link>
            </li>
          </ul>
        </div>
        <div className="overflow-x-auto md:col-span-3">
          <h1 className="mb-4 text-2xl font-semibold text-gray-800">
            Catalogs
          </h1>
          {loading ? (
            <div className="flex justify-center items-center h-full"></div>
          ) : error ? (
            <div className="alert-error bg-red-100 text-red-700 p-4 rounded-lg shadow-md">
              {error}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-lg">
                <thead className="border-b-2 border-gray-300">
                  <tr>
                    <th className="px-5 py-3 text-left text-gray-600">ID</th>
                    <th className="px-5 py-3 text-left text-gray-600">NAME</th>
                    <th className="px-5 py-3 text-left text-gray-600">PRICE</th>
                    <th className="px-5 py-3 text-left text-gray-600">
                      CATEGORY
                    </th>
                    <th className="px-5 py-3 text-left text-gray-600">COUNT</th>
                    <th className="px-5 py-3 text-left text-gray-600">
                      RATING
                    </th>
                    <th className="px-5 py-3 text-left text-gray-600">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-5 py-3">
                        {product._id.substring(18, 24)}
                      </td>
                      <td className="px-5 py-3">{product.name}</td>
                      <td className="px-5 py-3">${product.price}</td>
                      <td className="px-5 py-3">{product.category}</td>
                      <td className="px-5 py-3">{product.countInStock}</td>
                      <td className="px-5 py-3">{product.rating}</td>
                      <td className="px-5 py-3 flex space-x-2">
                        <Link
                          href={`/admin/product/${product._id}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </Link>
                        <button className="text-red-500 hover:text-red-700">
                          Delete
                        </button>
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

AdminProductScreen.auth = { adminOnly: true };

export default AdminProductScreen;
