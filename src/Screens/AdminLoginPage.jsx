import React, { useState } from "react";
import GreenLight from "../assets/bgl-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInUser } from "../firebase/index.ts";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addingUser, setAddingUser] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    setAddingUser(true);
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;

        const errorMessage = error.message;
        if (errorCode === "auth/user-not-found") {
          setError("User not found");
        }
        setError("Unkown Error, contact Admin");
      });

    setAddingUser(false);
  };

  return (
    <section className="py-24 md:py-32 bg-white white-bg-image text-center">
      <div className="container px-4 mx-auto">
        <div className="max-w-sm mx-auto">
          <div className="mb-6 text-center">
            <Link className="inline-block mb-6" to="/">
              <img src={GreenLight} alt="" width="100px" />
            </Link>
            <h3 className="mb-4 text-2xl md:text-3xl font-bold">
              Sign in as an Admin
            </h3>
          </div>
          <form onSubmit={onSubmit}>
            <div className="mb-6">
              <input
                className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="email"
                placeholder="admin@email.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                title="Email"
                about="Email Address"
                alt="Email Address"
              />
            </div>
            <div className="mb-4">
              <input
                className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                placeholder="************"
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
              />
            </div>

            <button
              className="flex justify-center  py-3 px-7 my-6 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
              disabled={addingUser}
              type="submit"
            >
              {addingUser && (
                <svg
                  className="animate-spin h-5 w-5 mr-3 rounded-full border-t-2 border-r-2 border-white"
                  viewBox="0 0 24 24"
                ></svg>
              )}
              Submit
            </button>
            <div className="flex justify-center">
              <small className=" text-red-500 font-medium ">{error}</small>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
