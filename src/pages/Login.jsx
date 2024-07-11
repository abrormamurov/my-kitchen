// pages/Login.jsx
import React, { useEffect, useState } from "react";
import { FormInput } from "../components";
import { Form, Link, useActionData } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useRegister } from "../hooks/useRegister";
import { IoLogoGoogle } from "react-icons/io";
import { IoLogInSharp } from "react-icons/io5";
import { BiSolidRegistered } from "react-icons/bi";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
};

function Login() {
  const userData = useActionData();
  const [errorStatus, setErrorStatus] = useState({
    email: false,
    password: false,
  });
  const { loginUser, isPending } = useLogin();
  const { isPending: isPendingGoogleRegister, registerWithGoogle } =
    useRegister();

  useEffect(() => {
    if (userData) {
      if (userData.email && userData.password) {
        loginUser(userData.email, userData.password);
      } else {
        setErrorStatus({
          email: !userData.email,
          password: !userData.password,
        });
      }
    }
  }, [userData, loginUser]);

  return (
    <div className="login-page   lg:grid-cols-2 min-h-screen items-center flex justify-center">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/public/video.mp4"
        autoPlay
        loop
        muted
      />
      <video
        className="absolute inset-0 w-full h-full object-cover lg:hidden"
        src="/videos/login-background.mp4"
        autoPlay
        loop
        muted
      />
      <div className="card glass w-full max-w-md lg:w-96  shadow-xl p-8 ">
        <Form method="post" className="flex flex-col items-center gap-5">
          <h1 className="text-3xl font-semibold">Login</h1>
          <FormInput
            type="email"
            label="Email"
            name="email"
            className={errorStatus.email ? "input-error" : ""}
          />
          <FormInput
            type="password"
            label="Password"
            name="password"
            className={errorStatus.password ? "input-error" : ""}
          />
          <div className="w-full">
            {!isPending && (
              <button className="btn btn-primary btn-block">
                {" "}
                <IoLogInSharp className="w-6 h-6" />
                Login
              </button>
            )}
            {isPending && (
              <button disabled className="btn btn-primary btn-block">
                ...Loading...
              </button>
            )}
          </div>
        </Form>
        {isPendingGoogleRegister && (
          <div className="w-full mt-5 mb-5">
            <button
              onClick={registerWithGoogle}
              disabled
              className="btn btn-secondary btn-block"
            >
              Loading...
            </button>
          </div>
        )}
        {!isPendingGoogleRegister && (
          <div className="w-full mt-5 mb-5">
            <button
              onClick={registerWithGoogle}
              className="btn btn-secondary btn-block"
            >
              <IoLogoGoogle className="w-6 h-6" />
              Google
            </button>
          </div>
        )}
        <h2 className="text-center font-medium flex justify-center ">
          Don't have an account?{" "}
          <Link className="link link-primary flex" to="/register">
            Register
            <BiSolidRegistered />
          </Link>
        </h2>
      </div>
    </div>
  );
}

export default Login;
