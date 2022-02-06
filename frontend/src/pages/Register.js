import React from "react";
import Axios from "axios";

import { PlusIcon } from "@heroicons/react/solid";
import { RefreshIcon } from "@heroicons/react/solid";

function Register() {
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [error, setError] = React.useState("");
  let [success, setSuccess] = React.useState("");
  let [waiting, setWaiting] = React.useState(false);

  const handleRegistration = async () => {
    if (email == "" || password == "") {
      setError("Complete all fields!");
      return;
    }
    setWaiting(true);

    Axios({
      method: "POST",
      data: {
        email: email,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:8000/auth/register",
    })
      .then((response) => {
        if (response.status == 201) {
          setError("");
          setSuccess(
            "Your account has been made! Please wait whilst you are redirected!"
          );

          setTimeout(function () {
            window.location = "/login";
          }, 1000);
        }
        console.log(response);
      })
      .catch((e) => {
        setWaiting(false);
        if (e.response.status == 409) {
          setError("A user already exists with that email!");
        } else {
          console.log(e);
        }
      });
  };

  return (
    <>
      <div className="min-h-screen flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8 bg-grey-100">
        <div className="max-w-md w-full space-y-8">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-emerald-600.svg"
              alt="Workflow"
            /> */}
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Register for your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <a
                href="/login"
                className="font-medium text-emerald-600 hover:text-emerald-500"
              >
                sign in to your account
              </a>
            </p>
          </div>
          <form
            className="container shadow-xl rounded-lg p-6"
            action="http://localhost:8000/auth/login"
            method="POST"
          >
            <div>
              {error ? (
                <p className="text-red-500 text-center text-sm font-medium">
                  {error}
                </p>
              ) : success ? (
                <p className="text-green-500 text-center text-sm font-medium">
                  {success}
                </p>
              ) : (
                ""
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="my-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="">
              {waiting ? (
                <button
                  type="button"
                  disabled
                  className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-100 bg-gray-500  focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <RefreshIcon
                      className="animate-reverse-spin h-5 w-5 text-gray-100"
                      aria-hidden="true"
                    />
                  </span>
                  Please Wait
                </button>
              ) : (
                <button
                  type="button"
                  className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  onClick={handleRegistration}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusIcon
                      className="h-5 w-5 text-emerald-500 group-hover:text-emerald-400"
                      aria-hidden="true"
                    />
                  </span>
                  Create account
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
