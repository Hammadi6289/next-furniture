import axios from "axios";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";
import { FaPlus } from "react-icons/fa";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, users: action.payload, error: "" };
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

function AdminUsersScreen() {
  const router = useRouter();
  const [
    { loading, error, users, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    users: [],
    error: "",
  });

  const createHandler = async () => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(`/api/admin/users`);
      dispatch({ type: "CREATE_SUCCESS" });
      toast.success("User created successfully");
      router.push(`/admin/user/${data.user._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/users`);
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

  const deleteHandler = async (userId) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/users/${userId}`);
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("User deleted successfully");
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Users">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="md:col-span-1">
          <div className="bg-gray-100 p-5 rounded-lg shadow-lg">
            <ul className="space-y-6">
              <li>
                <Link href="/admin/dashboard" className=" hover:underline">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/orders" className=" hover:underline">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/admin/products" className=" hover:underline">
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="font-bold text-blue-800 hover:underline"
                >
                  Users
                </Link>
              </li>
            </ul>
          </div>

          {/* ////////////////// --*/}
          {/* ////////////////// --*/}
          {/* ////////////////// --*/}
          {/* ////////////////// --*/}
          {/* ////////////////// --*/}
        </div>

        <div className="md:col-span-3">
          <h1 className="mb-6 mt-4 text-3xl font-bold text-gray-800 pb-2 border-b-2 border-gray-300 shadow-sm">
            Users
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
                  Add new User
                </span>
              )}
            </button>
          </div>
          {loading ? (
            <div className="text-gray-700">Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b">
                    <th className="w-1/6 px-4 py-2 text-left">ID</th>
                    <th className="w-1/4 px-4 py-2 text-left">NAME</th>
                    <th className="w-1/4 px-4 py-2 text-left">EMAIL</th>
                    <th className="w-1/6 px-4 py-2 text-left">ADMIN</th>
                    <th className="w-1/6 px-4 py-2 text-left">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b">
                      <td className="px-4 py-2">
                        {user._id.substring(20, 24)}
                      </td>
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">
                        {user.isAdmin ? "YES" : "NO"}
                      </td>
                      <td className="px-4 py-2">
                        <Link
                          href={`/admin/user/${user._id}`}
                          passHref
                          className="inline-block px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-md transition duration-300 mr-2"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="inline-block px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md shadow-md transition duration-300"
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
}

AdminUsersScreen.auth = { adminOnly: true };
export default AdminUsersScreen;
