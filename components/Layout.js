import { Store } from "@/utils/Store";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image"; // Import the Image component
import React, { useContext, useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { SearchIcon } from "@heroicons/react/outline";

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };
  const [query, setQuery] = useState("");

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <>
      <Head>
        <title>{title ? title + " - Mr. Furniture" : "Mr. Furniture"}</title>
        <meta name="description" content="Ecommerce Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between bg-gray-100">
        <header className="bg-gradient-to-r from-green-700 to-yellow-500 shadow-lg">
          <nav className="container mx-auto flex items-center justify-between py-4 px-6">
            <div className="flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-8">
              <Link href="/" passHref>
                <div className="flex items-center mb-4 md:mb-0">
                  <Image
                    src="/images/logo_for_mr_furniture.png"
                    alt="Mr. Furniture Logo"
                    width={100}
                    height={100}
                    className="hover:opacity-80 transition duration-300 rounded-full"
                  />
                  <h1 className="text-white text-2xl font-bold ml-4">
                    Mr. Furniture
                  </h1>
                </div>
              </Link>
              <form
                onSubmit={submitHandler}
                className="w-full md:w-auto flex justify-center items-center"
              >
                <div className="relative flex w-full max-w-md">
                  <input
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                    className="w-full md:w-96 p-4 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition duration-300"
                    placeholder="Search products"
                  />
                  <button
                    className="flex items-center justify-center p-2 bg-amber-400 text-black rounded-r-md transition duration-300 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    type="submit"
                    id="button-addon2"
                  >
                    <SearchIcon className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>

            <div className="flex items-center space-x-4">
              {/* Cart Link */}
              <Link
                href="/cart"
                className="relative p-2 text-lg font-medium text-white hover:text-blue-200 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-14 w-14 text-white"
                  viewBox="0 0 24 14"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 0 1 1-1h13a1 1 0 0 1 .707 1.707l-5.5 5.5a1 1 0 0 0-.293.707V15a1 1 0 1 1-2 0v-3.086a1 1 0 0 0-.293-.707L2.293 6.707A1 1 0 0 1 3 5zm14 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-4 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-8-9a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="absolute top-0 right-0 mt-1 mr-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  {cartItemsCount}
                </span>
              </Link>
              {/* News Link */}
              <Link
                href="/news"
                className="p-2 text-lg font-medium text-white hover:text-blue-200 transition duration-300"
              >
                News
              </Link>
              {/* Alerts Link */}
              <Link
                href="/alerts"
                className="p-2 text-lg font-medium text-white hover:text-blue-200 transition duration-300"
              >
                Alerts
              </Link>
              {status === "loading" ? (
                <div className="text-lg text-white">Loading</div>
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block text-lg">
                  <Menu.Button className="text-white hover:text-blue-200 transition duration-300">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg rounded-lg">
                    <Menu.Item as="div">
                      {({ active }) => (
                        <DropdownLink
                          className={`dropdown-link ${
                            active ? "bg-gray-100" : ""
                          }`}
                          href="/profile"
                        >
                          My Profile
                        </DropdownLink>
                      )}
                    </Menu.Item>
                    <Menu.Item as="div">
                      {({ active }) => (
                        <DropdownLink
                          className={`dropdown-link ${
                            active ? "bg-gray-100" : ""
                          }`}
                          href="/order-history"
                        >
                          Order History
                        </DropdownLink>
                      )}
                    </Menu.Item>
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/admin/dashboard"
                        >
                          Admin Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )}
                    <Menu.Item as="div">
                      {({ active }) => (
                        <a
                          className={`dropdown-link ${
                            active ? "bg-gray-100" : ""
                          } cursor-pointer`}
                          onClick={logoutClickHandler}
                        >
                          Logout
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link
                  href="/login"
                  className="p-2 text-lg font-medium text-white hover:text-blue-200 transition duration-300"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>

        <motion.main
          className="container m-auto mt-4 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.main>

        <footer className="flex h-16 justify-center items-center shadow-inner bg-green-900 p-12">
          <p className="text-white text-sm">
            © 2024 Mr.Furniture Pvt Limited. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
