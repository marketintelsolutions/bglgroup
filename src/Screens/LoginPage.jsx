import React, { useState } from "react";
import GreenLight from "../assets/bgl-removebg-preview.png";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import queryString from "query-string";
import { message } from "antd";
import download from "../utils/download";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [passcode, setPasscode] = useState("");
  const params = [];

  for (let entry of searchParams.entries()) {
    params.push(entry);
  }
  console.log({ searchParams: searchParams.entries() });

  const { search } = useLocation();
  const parsed = queryString.parse(search);
  console.log({ parsed });
  console.log({ search });
  const emailHasBeenSent = typeof parsed.email === "string";
  console.log({ emailHasBeenSent });
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    handleSendEmail();
  };

  const handleSendEmail = () => {
    setSendingEmail(true);
    setTimeout(() => {
      setSendingEmail(false);
      parsed.email = email;
      const stringified = queryString.stringify(parsed);
      message.success(`Email sent to ${email}`);
      navigate(`/login?${stringified}`);
    }, 2000);
  };

  const changeEmail = () => {
    parsed.email = undefined;
    const stringified = queryString.stringify(parsed);
    navigate(`/login?${stringified}`);
  };

  const confirmPasscode = (e) => {
    e.preventDefault();
    const correctPasscode = "12345";
    if (passcode !== correctPasscode) {
      return message.error("Incorrect Passcode");
    }
    //Set access and time in local storage
    localStorage.setItem(
      "access",
      JSON.stringify({ accessTime: Date.now(), email })
    );
    const purpose = parsed.purpose;
    if (purpose === "download") {
      download(
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      );
      navigate("/");
    }
    if (purpose === "account") {
      navigate(`/account?email=${parsed.email}`);
    }
    console.log({ purpose });
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
              Sign in to your account
            </h3>
          </div>
          {!emailHasBeenSent && (
            <form onSubmit={onSubmit}>
              <div class="mb-6">
                <label class="block mb-2 text-coolGray-800 font-medium" for="">
                  Email
                </label>
                <input
                  class="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-center"
                  type="email"
                  placeholder="name@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={emailHasBeenSent}
                  contentEditable={!emailHasBeenSent}
                  title="Email"
                  about="Email Address"
                  alt="Email Address"
                />
              </div>

              <>
                <p class="text-lg text-coolGray-500 font-medium ">
                  Passcode will be sent to{" "}
                  {email || parsed.email || "your email"}.
                </p>
                <button
                  class="flex justify-center  py-3 px-7 my-6 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
                  disabled={sendingEmail}
                  type="submit"
                >
                  {sendingEmail && (
                    <svg
                      class="animate-spin h-5 w-5 mr-3 rounded-full border-t-2 border-r-2 border-white"
                      viewBox="0 0 24 24"
                    ></svg>
                  )}
                  Send Passcode
                </button>
              </>
            </form>
          )}
          {emailHasBeenSent && (
            <form onSubmit={confirmPasscode}>
              <div class="mb-4">
                <label class="block mb-2 text-coolGray-800 font-medium" for="">
                  Enter Passcode sent to {email || parsed.email || "your email"}
                  .
                </label>
                <input
                  class="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-center"
                  placeholder="************"
                  onChange={(e) => setPasscode(e.target.value)}
                  required
                />
              </div>
              <div class="flex flex-wrap items-center justify-between mb-6">
                <div class="w-full md:w-1/2 text-left">
                  <span
                    class="text-xs text-coolGray-800 font-medium flex items-center cursor-pointer"
                    onClick={handleSendEmail}
                  >
                    Resend Code{" "}
                    {sendingEmail && (
                      <svg
                        class="animate-spin h-3 w-3 ml-3 rounded-full border-t-2 border-r-2 border-black"
                        viewBox="0 0 24 24"
                      ></svg>
                    )}
                  </span>
                </div>
                <div class="w-full md:w-auto mt-1">
                  <button
                    class="inline-block text-xs font-medium text-green-500 hover:text-green-600"
                    type="button"
                    onClick={changeEmail}
                  >
                    Change email address?
                  </button>
                </div>
              </div>

              <button
                class="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
                type="submit"
              >
                Sign In
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
