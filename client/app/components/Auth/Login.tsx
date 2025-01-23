/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "@/app/styless/style";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password cannot exceed 15 characters")
    .required("Please enter your password!"),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful!");
      setOpen(false);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error]);

  const { touched, errors, values, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <div className="w-full">
      <h1 className={styles.title}>Login With LearnNexus</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Input */}
        <div className="flex flex-col">
          <label htmlFor="email" className={styles.label}>
            Enter your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            aria-label="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your email"
            className={`border-2 px-3 py-2 rounded-md text-black dark:text-white bg-transparent
              ${
                errors.email && touched.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email}</span>
          )}
        </div>

        {/* Password Input */}
        <div className="flex flex-col relative">
          <label htmlFor="password" className={styles.label}>
            Enter your password
          </label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              name="password"
              id="password"
              autoComplete="current-password"
              aria-label="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
              className={`border-2 px-3 py-2 rounded-md w-full text-black dark:text-white bg-transparent
                ${
                  errors.password && touched.password
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShow(!show)}
              aria-label="Toggle password visibility"
            >
              {show ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </button>
          </div>
          {errors.password && touched.password && (
            <span className="text-red-500 text-sm mt-1">{errors.password}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full mt-4">
          <button type="submit" className={styles.button}>
            Login
          </button>
        </div>

        <h5 className="text-center pt-3 font-Poppins text-[14px] text-black dark:text-white">
          Or Join with
        </h5>

        <div className="flex items-center justify-center space-x-4 my-2">
          <button type="button" aria-label="Login with Google">
            <FcGoogle
              size={30}
              className="cursor-pointer"
              onClick={() => signIn("google")}
            />
          </button>
          <AiFillGithub
            size={30}
            className="cursor-pointer text-black dark:text-white"
            onClick={() => signIn("github")}
          />
        </div>

        <h5 className="text-center pt-3 font-Poppins text-[14px] text-black dark:text-white">
          Don&apos;t have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setRoute("Sign-up")}
          >
            Sign Up
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Login;
