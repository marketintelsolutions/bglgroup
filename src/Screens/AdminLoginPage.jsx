import React, { useState } from "react";
import GreenLight from "../assets/bgl-removebg-preview.png";
import { Link } from "react-router-dom";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section class="py-24 md:py-32 bg-white white-bg-image text-center">
      <div class="container px-4 mx-auto">
        <div class="max-w-sm mx-auto">
          <div class="mb-6 text-center">
            <Link class="inline-block mb-6" to="/">
              <img src={GreenLight} alt="" width="100px" />
            </Link>
            <h3 class="mb-4 text-2xl md:text-3xl font-bold">
              Sign in as an Admin
            </h3>
          </div>
          <form onSubmit={onSubmit}>
            <div class="mb-6">
              <input
                class="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="email"
                placeholder="admin@email.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                title="Email"
                about="Email Address"
                alt="Email Address"
              />
            </div>
            <div class="mb-4">
              <input
                class="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                placeholder="************"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              class="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
