import axios from "axios";
import React, { useEffect, useReducer } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
}
const AdminProductScreen = () => {
  const router = useRouter();
  const [
    { loading, loadingCreate, loadingDelete, successDelete, error, products },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  const createHandler = async () => {
    if (!window.confirm("Are you Sure")) {
      return;
    }
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(`/api/admin/products`);
      dispatch({ type: "CREATE_SUCCESS" });
      toast.success("Catalog created successfully");
      router.push(`/admin/product/${data.product._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };

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
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (productId) => {
    if (!window.confirm("Are you Sure to delete this Item from Catalog?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/products/${productId}`);
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("Item deleted successfully");
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Admin Products">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="bg-gray-100 p-5 rounded-lg shadow-lg">
          <ul>
            <li className="mb-2">
              <Link href="/admin/dashboard" className="hover:text-blue-700">
                Dashboard
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/admin/orders" className="hover:text-blue-700">
                Orders
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/admin/products" className="font-bold text-blue-700">
                Catalogs
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/admin/users" className="hover:text-blue-700">
                Users
              </Link>
            </li>
          </ul>
        </div>
        <div className="overflow-x-auto md:col-span-3">
          <h1 className="mb-6 mt-4 text-3xl font-bold text-gray-800 pb-2 border-b-2 border-gray-300 shadow-sm">
            Catalogs
          </h1>
          {loadingDelete && <div>Deleting item...</div>}
          <div className="flex justify-end p-8 mb-8 mt-2">
            <button
              disabled={loadingCreate}
              onClick={createHandler}
              className={`inline-flex items-center px-6 py-3 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-md shadow-md transition duration-300 ${
                loadingCreate ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loadingCreate ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading
                </span>
              ) : (
                <span className="flex items-center">
                  <FaPlus className="mr-2" />
                  Add new Catalogue
                </span>
              )}
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-full">
              Loading...
            </div>
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
                          type="button"
                          className="inline-block px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-md transition duration-300"
                        >
                          Edit
                        </Link>
                        <button
                          className="inline-block px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md shadow-md transition duration-300"
                          onClick={() => deleteHandler(product._id)}
                          type="button"
                        >
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
