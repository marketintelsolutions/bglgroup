import React, { useEffect, useState } from "react";
import GreenLight from "../assets/bgl-removebg-preview.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { checkUser } from "../firebase/index.ts";
import formatPrice from "../utils/formatPrice.ts";

export default function AccountBalance() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(false);
  const [error, setError] = useState("");

  const parsed = queryString.parse(search);

  const loadUser = async () => {
    setLoadingUser(true);
    setError("");
    const userEmail = parsed.email;
    const { data, exists } = await checkUser(userEmail);

    if (!exists) {
      setLoadingUser((v) => false);
      setError("User not found");
      return;
    }

    const passcodeHasExpired = Date.now() - data.codeGeneratedOn > 30 * 60000; //Code was generated more than 30 minutes ago.

    if (passcodeHasExpired) {
      setLoadingUser((v) => false);
      setError("Passcode has expired");
      return;
    }
    setLoadingUser((v) => false);
    setUser(data);
  };

  useEffect(() => {
    loadUser();
  }, [parsed.email]);

  return (
    <section className="relative pt-28 pb-36 bg-blueGray-50 overflow-hidden">
      {user && !loadingUser && (
        <>
          <div className="absolute top-[20px] right-10 flex gap-x-2">
            <button
              className="inline-block py-2 px-7 mb-6 text-base text-gray-600 font-medium leading-6 border rounded-md shadow-sm"
              onClick={() => {
                window.print();
              }}
            >
              Print
            </button>
          </div>
          <Link className="mb-6 flex justify-center" to="/">
            <img src={GreenLight} alt="" width="100px" />
          </Link>
          <div className="container px-4 mx-auto">
            <h2 className="mb-5 text-6xl md:text-7xl font-bold font-heading text-center tracking-px-n leading-tight">
              {user.fullName}
            </h2>
            <p className=" text-lg text-gray-600 text-center font-medium leading-normal md:max-w-2xl mx-auto">
              Your balance as at {new Date().toLocaleString()}
            </p>
            <p className="mb-16 text-lg text-gray-600 text-center font-medium leading-normal md:max-w-2xl mx-auto">
              {user.email}
            </p>
            <div className="md:max-w-2xl mx-auto bg-white rounded-4xl shadow-8xl">
              <div className="flex flex-wrap justify-center items-center">
                <div className="w-full md:flex-1">
                  <div className="text-center p-8 md:px-16 md:pt-9 md:pb-11">
                    <p className="mb-4 text-indigo-600 font-semibold leading-normal">
                      Account Balance
                    </p>
                    <h2 className="mb-4 text-6xl md:text-6xl xl:text-10xl font-bold font-heading tracking-px-n leading-none">
                      {formatPrice(user.balance)}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {loadingUser && (
        <div className="fixed h-screen w-screen bg-green-100 top-0 justify-center flex items-center bg-opacity-50">
          <svg
            className="animate-spin h-7 w-7 mr-3 rounded-full border-2 border-t border-black"
            viewBox="0 0 24 24"
          ></svg>
        </div>
      )}
      {!user && !loadingUser && error && (
        <div className="fixed h-screen w-screen bg-green-100 top-0 justify-center flex flex-col items-center bg-opacity-50">
          <Link to="/">
            <img src={GreenLight} alt="" width="100px" />
          </Link>
          <p className="my-6">{error}</p>
        </div>
      )}
    </section>
  );
}
