import React, { useState } from "react";
import GreenLight from "../assets/bgl-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import download from "../utils/download";

export default function SchemeofArrangement() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    if (password !== "scheme") {
      setLoading(false);
      return setError("Invalid Passcode");
    }
    setTimeout(() => {
      setLoading(false);
      download(
        "https://bglgroup.s3.eu-west-2.amazonaws.com/BGL+SCHEME+OF+ARRANGEMENT_FINAL.pdf"
      );
      navigate("/");
    }, 3000);
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
              Enter your passcode to download the Scheme of Arrangement
            </h3>
          </div>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <input
                className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-center"
                placeholder="************"
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
              />
            </div>

            <button
              className="flex justify-center py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
              type="submit"
              disabled={loading}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 mr-3 rounded-full border-t-2 border-r-2 border-white"
                  viewBox="0 0 24 24"
                ></svg>
              )}
              Download
            </button>
            <small className=" text-red-500 font-medium ">{error}</small>
            <p className="text-lg text-gray-700 font-medium ">
              Please call help desk on{" "}
              <a href="tel:08109976905" className="text-gray-700">
                08109976905
              </a>{" "}
              to obtain your access code.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
