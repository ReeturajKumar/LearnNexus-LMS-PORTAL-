/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC, useState, useCallback, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "@/app/styless/style";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};

// ✅ Form Validation Schema using Yup
const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string().email("Invalid email!").required("Please enter your email!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please enter your password!"),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, {error, data,isSuccess }] = useRegisterMutation();
  

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful! Please check your email to activate your account.";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if("data" in error){
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  // ✅ Optimize password visibility toggle
  const togglePasswordVisibility = useCallback(() => setShow((prev) => !prev), []);


  // ✅ Formik for form handling
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = { name, email, password };
      await register(data);
    },
  });

  const { touched, errors, values, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={styles.title}>Join With LearnNexus</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ✅ Name Input */}
        <div className="flex flex-col">
          <label htmlFor="name" className={styles.label}>
            Enter your name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            aria-label="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your name"
            className={`border-2 px-3 py-2 rounded-md text-black dark:text-white bg-transparent
              ${errors.name && touched.name ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`}
          />
          {errors.name && touched.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
        </div>

        {/* ✅ Email Input */}
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
              ${errors.email && touched.email ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`}
          />
          {errors.email && touched.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
        </div>

        {/* ✅ Password Input */}
        <div className="flex flex-col relative">
          <label htmlFor="password" className={styles.label}>
            Enter your password
          </label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              name="password"
              id="password"
              autoComplete="new-password"
              aria-label="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
              className={`border-2 px-3 py-2 rounded-md w-full text-black dark:text-white bg-transparent
                ${errors.password && touched.password ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={togglePasswordVisibility}
              aria-label="Toggle password visibility"
            >
              {show ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
            </button>
          </div>
          {errors.password && touched.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
        </div>

        {/* ✅ Submit Button */}
        <div className="w-full mt-4">
          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </div>

        <h5 className="text-center pt-3 font-Poppins text-[14px] text-black dark:text-white">
          Or Join with
        </h5>

        {/* ✅ Google & GitHub Login */}
        <div className="flex items-center justify-center space-x-4 my-2">
          <button type="button" aria-label="Sign up with Google">
            <FcGoogle size={30} className="cursor-pointer" />
          </button>
          <AiFillGithub size={30} className="cursor-pointer text-black dark:text-white" />
        </div>

        <h5 className="text-center pt-3 font-Poppins text-[14px] text-black dark:text-white">
          Already have an account?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={() => setRoute("Login")}>
            Sign In
          </span>
        </h5>
      </form>
    </div>
  );
};

export default SignUp;
