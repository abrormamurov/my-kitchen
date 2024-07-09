import React, { useEffect, useState } from "react";
import { FormInput } from "../components";
import { Form, useActionData } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let photoURL = formData.get("photoURL");
  let displayName = formData.get("displayName");
  return { email, password, photoURL, displayName };
};

function Register() {
  const userData = useActionData();
  const { register, isPending, registerWithGoogle } = useRegister();
  const [errorStatus, setErrorStatus] = useState({
    displayName: false,
    photoURL: false,
    email: false,
    password: false,
  });

  useEffect(() => {
    if (userData) {
      const hasError =
        !userData.email ||
        !userData.password ||
        !userData.displayName ||
        !userData.photoURL;
      setErrorStatus({
        displayName: !userData.displayName,
        photoURL: !userData.photoURL,
        email: !userData.email,
        password: !userData.password,
      });

      if (!hasError) {
        register(
          userData.email,
          userData.password,
          userData.displayName,
          userData.photoURL
        );
      }
    }
  }, [userData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="hidden lg:block h-full bg-amber-100 bg-[url('https://picsum.photos/1400/1800')] bg-center bg-cover"></div>
      <div className="h-full grid place-items-center bg-slate-300 lg:bg-none bg-[url('https://picsum.photos/1000/1800')] bg-center bg-cover">
        <div className="card bg-base-100 w-96 shadow-xl p-8">
          <Form method="post" className="flex flex-col items-center gap-5">
            <h1 className="text-3xl font-semibold">Register</h1>
            <FormInput
              type="text"
              label="Display Name"
              name="displayName"
              className={errorStatus.displayName ? "input-error" : ""}
            />
            <FormInput
              type="url"
              label="Photo URL"
              name="photoURL"
              className={errorStatus.photoURL ? "input-error" : ""}
            />
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
                <button className="btn btn-primary btn-block">Register</button>
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
                Google
              </button>
            </div>
          )}
          <h2 className="text-center font-medium">
            Already have an account?{" "}
            <Link className="link link-primary" to="/login">
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Register;
