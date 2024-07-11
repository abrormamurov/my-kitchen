// pages/Register.jsx
import React, { useEffect, useState } from "react";
import { FormInput } from "../components";
import { Form, useActionData } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { IoLogoGoogle } from "react-icons/io";
import { BiSolidRegistered } from "react-icons/bi";
import { IoLogInSharp } from "react-icons/io5";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let photoURL = formData.get("photoURL");
  let displayName = formData.get("firstName");
  let lastName = formData.get("lastName");
  return { email, password, photoURL, firstName, lastName };
};

function Register() {
  const userData = useActionData();
  const { register, isPending, registerWithGoogle } = useRegister();
  const [errorStatus, setErrorStatus] = useState({
    firstName: false,
    photoURL: false,
    email: false,
    password: false,
    lastName: false,
  });

  useEffect(() => {
    if (userData) {
      const hasError =
        !userData.email ||
        !userData.password ||
        !userData.firstName ||
        !userData.photoURL ||
        !userData.lastName;
      setErrorStatus({
        displayName: !userData.firstName,
        lastName: !userData.lastName,
        photoURL: !userData.photoURL,
        email: !userData.email,
        password: !userData.password,
      });

      if (!hasError) {
        register(
          userData.email,
          userData.password,
          userData.firstName,
          userData.photoURL,
          userData.lastName
        );
      }
    }
  }, [userData]);

  return (
    <div className=" grid-cols-1 lg:grid-cols-2 min-h-screen  items-center flex justify-center">
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
      <div className="card glass w-96 shadow-xl p-8">
        <Form method="post" className="flex flex-col items-center gap-5">
          <h1 className="text-3xl font-semibold">Register</h1>
          <div className="flex gap-3">
            <FormInput
              type="text"
              label="First Name"
              name="firstName"
              className={errorStatus.firstName ? "input-error" : ""}
            />
            <FormInput
              type="text"
              label="Last Nme"
              name="lastName"
              className={errorStatus.lastName ? "input-error" : ""}
            />
          </div>
          <FormInput
            type="email"
            label="Email"
            name="email"
            className={errorStatus.email ? "input-error" : ""}
          />
          <div className="flex gap-3">
            <FormInput
              type="url"
              label="Photo URL"
              name="photoURL"
              className={errorStatus.photoURL ? "input-error" : ""}
            />

            <FormInput
              type="password"
              label="Password"
              name="password"
              className={errorStatus.password ? "input-error" : ""}
            />
          </div>
          <div className="w-full">
            {!isPending && (
              <button className="btn btn-primary btn-block">
                <BiSolidRegistered className="w-6 h-6" /> Register
              </button>
            )}
            {isPending && (
              <button disabled className="btn btn-primary btn-block">
                ...Loading...
              </button>
            )}
          </div>
        </Form>
        {isPending && (
          <div className="w-full mt-5 mb-5">
            <button
              disabled
              onClick={registerWithGoogle}
              className="btn btn-secondary btn-block"
            >
              Loading...
            </button>
          </div>
        )}
        {!isPending && (
          <div className="w-full mt-5 mb-5">
            <button
              onClick={registerWithGoogle}
              className="btn btn-secondary btn-block"
            >
              <IoLogoGoogle className="w-6 h-6" /> Google
            </button>
          </div>
        )}
        <h2 className="text-center font-medium flex justify-center">
          Already have an account?{" "}
          <Link className="link link-primary flex" to="/login">
            Login <IoLogInSharp />
          </Link>
        </h2>
      </div>
    </div>
  );
}

export default Register;
