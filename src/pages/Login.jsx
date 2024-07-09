import React, { useEffect, useState } from "react";
import { FormInput } from "../components";
import { Form, Link, useActionData } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useRegister } from "../hooks/useRegister";

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
    <div className=" grid grid-cols-1 lg:grid-cols-2 min-h-screen  ">
      <div className="hidden lg:block h-full bg-amber-100  bg-[url('https://picsum.photos/1400/1800')] bg-center bg-cover"></div>
      <div className="h-full grid place-items-center bg-slate-300 lg:bg-none bg-[url('https://picsum.photos/1400/1800')] bg-center bg-cover p-4 lg:p-0">
        <div className="card bg-base-100 w-full max-w-sm lg:w-96 shadow-xl p-8">
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
                <button className="btn btn-primary btn-block">Login</button>
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
                Google
              </button>
            </div>
          )}
          <h2 className="text-center font-medium">
            Don't have an account?{" "}
            <Link className="link link-primary" to="/register">
              Register
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
