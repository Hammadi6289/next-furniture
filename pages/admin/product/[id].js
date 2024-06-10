import Layout from "@/components/Layout";
import { getError } from "@/utils/error";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const AdminProductEditScreen = () => {
  const { query } = useRouter();
  const productId = query.id;
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/products/${productId}`);
        dispatch({ type: "FETCH_SUCCESS" });
        setValue("name", data.name);
        setValue("slug", data.slug);
        setValue("price", data.price);
        setValue("image", data.image);
        setValue("category", data.category);
        setValue("brand", data.brand);
        setValue("countInStock", data.countInStock);
        setValue("description", data.description);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, [productId, setValue]);

  const router = useRouter();

  const submitHandler = async ({
    name,
    slug,
    price,
    category,
    image,
    brand,
    countInStock,
    description,
  }) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/admin/products/${productId}`, {
        name,
        slug,
        price,
        category,
        image,
        brand,
        countInStock,
        description,
      });
      dispatch({ type: "UPDATE_SUCCESS" });
      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title={`Edit Product ${productId}`}>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="bg-white p-4 rounded-md shadow-md">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin/dashboard"
                className="text-blue-600 hover:text-blue-800 transition duration-300"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/orders"
                className="text-blue-600 hover:text-blue-800 transition duration-300"
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                href="/admin/products"
                className="font-bold text-blue-800 hover:text-blue-900 transition duration-300"
              >
                Catalogs
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className="text-blue-600 hover:text-blue-800 transition duration-300"
              >
                Users
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          {loading ? (
            <div className="text-center py-10">
              <div className="loader"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          ) : error ? (
            <div className="alert alert-error">{error}</div>
          ) : (
            <form
              className="mx-auto max-w-screen-md bg-white p-6 rounded-md shadow-md"
              onSubmit={handleSubmit(submitHandler)}
            >
              <h1 className="mb-6 text-2xl font-semibold text-gray-800">{`Edit catalogue # ${productId}`}</h1>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block mb-1 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  id="name"
                  autoFocus
                  {...register("name", {
                    required: "Please enter name",
                  })}
                />
                {errors.name && (
                  <div className="mt-1 text-red-500 text-sm">
                    {errors.name.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="slug"
                  className="block mb-1 text-sm text-gray-600"
                >
                  Slug
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  id="slug"
                  {...register("slug", {
                    required: "Please enter slug",
                  })}
                />
                {errors.slug && (
                  <div className="mt-1 text-red-500 text-sm">
                    {errors.slug.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block mb-1 text-sm text-gray-600"
                >
                  Price
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  id="price"
                  {...register("price", {
                    required: "Please enter price",
                  })}
                />
                {errors.price && (
                  <div className="mt-1 text-red-500 text-sm">
                    {errors.price.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block mb-1 text-sm text-gray-600"
                >
                  Image
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  id="image"
                  {...register("image", {
                    required: "Please enter image",
                  })}
                />
                {errors.image && (
                  <div className="mt-1 text-red-500 text-sm">
                    {errors.image.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block mb-1 text-sm text-gray-600"
                >
                  Category
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  id="category"
                  {...register("category", {
                    required: "Please enter category",
                  })}
                />
                {errors.category && (
                  <div className="mt-1 text-red-500 text-sm">
                    {errors.category.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="brand"
                  className="block mb-1 text-sm text-gray-600"
                >
                  Brand
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  id="brand"
                  {...register("brand", {
                    required: "Please enter brand",
                  })}
                />
                {errors.brand && (
                  <div className="mt-1 text-red-500 text-sm">
                    {errors.brand.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="countInStock"
                  className="block mb-1 text-sm text-gray-600"
                >
                  Count in Stock
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  id="countInStock"
                  {...register("countInStock", {
                    required: "Please enter countInStock",
                  })}
                />
                {errors.countInStock && (
                  <div className="mt-1 text-red-500 text-sm">
                    {errors.countInStock.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block mb-1 text-sm text-gray-600"
                >
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  id="description"
                  {...register("description", {
                    required: "Please enter description",
                  })}
                />
                {errors.description && (
                  <div className="mt-1 text-red-500 text-sm">
                    {errors.description.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <button
                  disabled={loadingUpdate}
                  className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
                >
                  {loadingUpdate ? "Loading..." : "Update"}
                </button>
              </div>
              <div className="mb-4">
                <Link
                  href={`/admin/products`}
                  className="text-blue-600 hover:text-blue-800 transition duration-300"
                >
                  Back
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

AdminProductEditScreen.auth = { adminOnly: true };

export default AdminProductEditScreen;
