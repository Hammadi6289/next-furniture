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
        <header className="bg-white shadow-md">
          <nav className="flex h-[100px] items-center px-2 justify-between bg-[#ba5c2d]">
            <Link href="/" passHref className="flex items-center">
              <Image
                src="/images/logo_for_mr_furniture.png"
                alt="Mr. Furniture Logo"
                width={180}
                height={40}
                className="hover:opacity-80 transition duration-300"
                style={{ borderRadius: "50%" }} // Added logo rounding
              />
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/cart"
                className="relative p-2 text-lg font-medium hover:text-blue-600 transition duration-300"
              >
                Cart
                {cartItemsCount > 0 && (
                  <span className="absolute top-0 right-0 ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-lg text-blue-600 hover:text-blue-800 transition duration-300">
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
                          Profile
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
                  className="p-2 text-lg font-medium hover:text-blue-600 transition duration-300"
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
        <footer className="flex h-10 justify-center items-center shadow-inner bg-white">
          <p className="text-gray-600">
            Copyright © 2024 Mr.Furniture Pvt Limited
          </p>
        </footer>
      </div>
    </>
  );
}
