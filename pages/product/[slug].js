import Layout from "@/components/Layout";
import Product from "@/models/Product";
import { Store } from "@/utils/Store";
import db from "@/utils/db";
//import data from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  //const { query } = useRouter();
  //const { slug } = query;
  //const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <Layout title="Item Not found">Product Not found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      return toast.error("Sorry. Item is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };
  return (
    <Layout title={product.name}>
      <div className="py-4">
        <Link href="/" className="text-blue-500 hover:underline">
          ← Back to products
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-6">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="md:col-span-1">
          <ul className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
            <li>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
            </li>
            <li className="flex items-center text-gray-700">
              <svg
                className="w-6 h-6 text-blue-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12h18m-9-9v18"
                ></path>
              </svg>
              <span className="font-semibold">Category: </span>
              <span className="ml-1">{product.category}</span>
            </li>
            <li className="flex items-center text-gray-700">
              <svg
                className="w-6 h-6 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              <span className="font-semibold">Brand: </span>
              <span className="ml-1">{product.brand}</span>
            </li>
            <li className="flex items-center text-gray-700">
              <svg
                className="w-6 h-6 text-yellow-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3"
                ></path>
              </svg>
              <span className="font-semibold">Rating: </span>
              <span className="ml-1">
                {product.rating} of {product.numReviews} reviews
              </span>
            </li>
            <li className="flex items-center text-gray-700">
              <svg
                className="w-6 h-6 text-red-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19V6h6v13m2 0H7"
                ></path>
              </svg>
              <span className="font-semibold">Description: </span>
              <span className="ml-1">{product.description}</span>
            </li>
          </ul>
        </div>

        <div className="md:col-span-1">
          <div className="card p-5 shadow-md rounded-lg">
            <div className="mb-4 flex justify-between text-lg">
              <span className="font-semibold">Price</span>
              <span className="text-green-600">₨{product.price}</span>
            </div>
            <div className="mb-4 flex justify-between text-lg">
              <span className="font-semibold">Status</span>
              <span
                className={
                  product.countInStock > 0 ? "text-green-600" : "text-red-600"
                }
              >
                {product.countInStock > 0 ? "In Stock" : "Unavailable"}
              </span>
            </div>
            <button
              className="primary-button w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
