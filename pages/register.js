import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { getError } from "@/utils/error";
import { toast } from "react-toastify";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import axios from "axios";

export default function LoginScreen() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, email, password }) => {
    //console.log(email, password);
    try {
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Create Account">
      <div className="flex items-center justify-center h-screen">
        <form
          className="bg-[#f2ede1] shadow-md rounded-md p-8 w-full max-w-lg "
          onSubmit={handleSubmit(submitHandler)}
        >
          {/* Increased maximum width */}
          <h1 className="text-4xl font-bold mb-6 text-center">Sign Up</h1>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-semibold">
              Name
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Please enter your name",
              })}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-amber-500"
              id="name"
              autoFocus
            />
            {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Please enter email",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "*Please enter valid email",
                },
              })}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-amber-500"
              id="email"
            />
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "*Please enter your password",
                minLength: {
                  value: 6,
                  message: "*Password must contain more than 5 chars",
                },
              })}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-amber-500"
              id="password"
            />
            {errors.password && (
              <div className="text-red-500 ">{errors.password.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 font-semibold"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "*Please Re-enter your password",
                validate: (value) => value === getValues("password"),
                minLength: {
                  value: 6,
                  message: "*Password must contain more than 5 chars",
                },
              })}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-amber-500"
            />
            {errors.confirmPassword && (
              <div className="text-red-500 ">
                {errors.confirmPassword.message}
              </div>
            )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === "validate" && (
                <div className="text-red-500 ">Password do not match</div>
              )}
          </div>

          <div className="mb-6">
            <button className="w-full py-2 px-4 bg-[#D2B48C] text-white font-semibold rounded-md hover:bg-[#CD853F] focus:outline-none focus:ring focus:ring-amber-500">
              Signup
            </button>
          </div>
          <div className="text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-[#D2B48C] hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
