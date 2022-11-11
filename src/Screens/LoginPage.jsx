import React, { useState } from "react";
import GreenLight from "../assets/bgl-removebg-preview.png";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import queryString from "query-string";
import {
  checkUser,
  updateUser,
  sendEmail,
  sendSMS,
} from "../firebase/index.ts";
import generateOTP from "../utils/generateOTP";
import { phone } from "phone";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [passcodeError, setPasscodeError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const params = [];

  for (let entry of searchParams.entries()) {
    params.push(entry);
  }

  const { search } = useLocation();
  const parsed = queryString.parse(search);
  const emailHasBeenSent = typeof parsed.email === "string";
  const phoneNumber = parsed.phoneNumber;
  const phoneError = parsed.phoneError;
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return setError("Enter a valid Email!");
    }
    handleSendEmail();
  };

  const handleSendEmail = async () => {
    setSendingEmail(true);
    setError("");
    const userEmail = email || parsed.email;
    const { data, exists } = await checkUser(userEmail);

    if (!exists) {
      setSendingEmail(false);
      setError("User not found");
      return;
    }

    const code = generateOTP();
    const phoneValidator = phone(data.phone, { country: "NIGERIA" });
    if (phoneValidator.isValid) {
      parsed.phoneNumber = phoneValidator.phoneNumber;

      setSendingEmail(true);
      await sendSMS(
        phoneValidator.phoneNumber,
        `Please use this code to access your BGL account as soon as possible. It expires in 30 minutes. code - ${code}`
      );
      setSendingEmail(false);
    } else {
      parsed.phoneError = "invalid_phone";
    }

    parsed.email = userEmail;
    //TODO - Send Email to User
    setSendingEmail(false);
    await sendEmail(
      userEmail,
      "Access Code - BGL Group",
      `Please use this code to access your account as soon as possible. It expires in 30 minutes. code - ${code}`,
      `Please use this code to access your account as soon as possible. It expires in 30 minutes. code - ${code}`
    );
    await updateUser({
      ...data,
      code,
      lastUpdated: Date.now(),
      codeGeneratedOn: Date.now(),
    });

    const stringified = queryString.stringify(parsed);
    setSendingEmail(false);
    window.location = `/login?${stringified}`;
  };

  const verifyPasscode = async (e) => {
    e.preventDefault();
    setVerifying(true);
    setPasscodeError("");
    const userEmail = email || parsed.email;
    const { data, exists } = await checkUser(userEmail);
    if (!exists) {
      setVerifying(false);
      setPasscodeError("Account not found");
      return;
    }
    if (passcode !== data.code) {
      setVerifying(false);
      setPasscodeError("Invalid Passcode");
      return;
    }

    const passcodeHasExpired = Date.now() - data.codeGeneratedOn > 30 * 60000; //Code was generated more than 30 minutes ago.

    if (passcodeHasExpired) {
      setVerifying(false);
      setPasscodeError("Passcode has expired");
      return;
    }

    parsed.email = userEmail;

    const stringified = queryString.stringify(parsed);
    setVerifying(false);
    navigate(`/account?${stringified}`);
  };

  const changeEmail = () => {
    parsed.email = undefined;
    parsed.phoneNumber = undefined;
    parsed.phoneError = undefined;
    const stringified = queryString.stringify(parsed);
    navigate(`/login?${stringified}`);
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
              Sign in to your account
            </h3>
          </div>
          {!emailHasBeenSent && (
            <form onSubmit={onSubmit}>
              <div className="mb-6">
                <label
                  className="block mb-2 text-coolGray-800 font-medium"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-center"
                  type="text"
                  typeof="email"
                  id="email"
                  placeholder="name@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={emailHasBeenSent || sendingEmail}
                  contentEditable={!emailHasBeenSent || sendingEmail}
                  title="Email"
                  about="Email Address"
                  alt="Email Address"
                />
              </div>

              <>
                <button
                  className="flex justify-center  py-3 px-7 mt-6 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
                  disabled={sendingEmail}
                  type="submit"
                >
                  {sendingEmail && (
                    <svg
                      className="animate-spin h-5 w-5 mr-3 rounded-full border-t-2 border-r-2 border-white"
                      viewBox="0 0 24 24"
                    ></svg>
                  )}
                  Send Passcode
                </button>
                <small className=" text-red-500 font-medium ">{error}</small>
                <p className="text-lg text-coolGray-500 font-medium mt-6">
                  Passcode will be sent to{" "}
                  {email || parsed.email || "your email"} and your registered
                  phone number.
                </p>
              </>
            </form>
          )}
          {emailHasBeenSent && (
            <form onSubmit={verifyPasscode}>
              <div className="mb-4">
                {phoneError && (
                  <small className=" text-red-500 font-light text-xs ">
                    Contact admin to set up your phone number and receive your
                    passcode via SMS.
                  </small>
                )}
                <label
                  className="block mb-2 text-coolGray-800 font-medium"
                  for=""
                >
                  Enter Passcode sent to {email || parsed.email || "your email"}
                  {phoneNumber ? ` and ${phoneNumber}` : ""}.
                </label>
                <input
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-center"
                  placeholder="************"
                  onChange={(e) => setPasscode(e.target.value)}
                  required
                  type="password"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between mb-6">
                <div className="w-full md:w-1/2 text-left">
                  <span
                    className="text-xs text-coolGray-800 font-medium flex items-center cursor-pointer"
                    onClick={handleSendEmail}
                  >
                    Resend Code{" "}
                    {sendingEmail && (
                      <svg
                        className="animate-spin h-3 w-3 ml-3 rounded-full border-t-2 border-r-2 border-black"
                        viewBox="0 0 24 24"
                      ></svg>
                    )}
                  </span>
                </div>
                <div className="w-full md:w-auto mt-1">
                  <button
                    className="inline-block text-xs font-medium text-green-500 hover:text-green-600"
                    type="button"
                    onClick={changeEmail}
                  >
                    Change email address?
                  </button>
                </div>
              </div>

              <button
                className="flex justify-center  py-3 px-7 mt-6 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
                disabled={verifying}
                type="submit"
              >
                {verifying && (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 rounded-full border-t-2 border-r-2 border-white"
                    viewBox="0 0 24 24"
                  ></svg>
                )}
                Sign in
              </button>
              <small className=" text-red-500 font-medium ">
                {passcodeError}
              </small>
              <p className="text-lg text-gray-700 font-medium mt-3">
                Please call help desk on{" "}
                <a href="tel:08109976905" className="text-gray-700">
                  08109976905
                </a>{" "}
                if you have trouble getting your Passcode.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
