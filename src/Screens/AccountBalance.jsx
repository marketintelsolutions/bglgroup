import React from "react";
import GreenLight from "../assets/bgl-removebg-preview.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

export default function AccountBalance() {
  const { search } = useLocation();
  const navigate = useNavigate();

  const parsed = queryString.parse(search);
  const signOut = () => {
    localStorage.removeItem("access");
    navigate("/");
  };

  return (
    <section class="relative pt-28 pb-36 bg-blueGray-50 overflow-hidden">
      <div className="absolute top-[20px] right-10 flex gap-x-2">
        <button
          class="inline-block py-2 px-7 mb-6 text-base text-gray-600 font-medium leading-6 border rounded-md shadow-sm"
          onClick={() => {
            window.print();
          }}
        >
          Print
        </button>
        {/* <button
          class="inline-block  py-2 px-7 mb-6 text-base text-red-400 font-medium leading-6 border border-red-400 rounded-md shadow-sm"
          onClick={signOut}
        >
          Sign Out
        </button> */}
      </div>
      <Link class="mb-6 flex justify-center" to="/">
        <img src={GreenLight} alt="" width="100px" />
      </Link>
      <img
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        src="flaro-assets/images/team/gradient.svg"
        alt=""
      />
      <div class="container px-4 mx-auto">
        <h2 class="mb-5 text-6xl md:text-7xl font-bold font-heading text-center tracking-px-n leading-tight">
          ADETAYO ODUNAYO ADEYEMI(GPN)
        </h2>
        <p class=" text-lg text-gray-600 text-center font-medium leading-normal md:max-w-2xl mx-auto">
          GCN balance as at {new Date().toLocaleString()}
        </p>
        <p class="mb-16 text-lg text-gray-600 text-center font-medium leading-normal md:max-w-2xl mx-auto">
          {parsed.email}
        </p>
        <div class="md:max-w-2xl mx-auto bg-white rounded-4xl shadow-8xl">
          <div class="flex flex-wrap justify-center items-center">
            <div class="w-full md:flex-1">
              <div class="text-center p-8 md:px-16 md:pt-9 md:pb-11">
                <p class="mb-4 text-indigo-600 font-semibold leading-normal">
                  Account Balance
                </p>
                <h2 class="mb-4 text-6xl md:text-8xl xl:text-10xl font-bold font-heading tracking-px-n leading-none">
                  &#8358; 49,020
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
