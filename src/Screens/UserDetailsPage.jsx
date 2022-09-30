import React, { useEffect, useState } from "react";
import GreenLight from "../assets/bgl-removebg-preview.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import { checkUser, updateUser } from "../firebase/index.ts";
import { auth } from "../firebase/index.ts";

export default function UserDetailsPage() {
  const loggedInUser = auth.currentUser;

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [balance, setBalance] = useState();
  const [updatingUser, setUpdatingUser] = useState(false);
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");

  const { search } = useLocation();
  const parsed = queryString.parse(search);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleUpdateUser();
  };

  const handleUpdateUser = async () => {
    setUpdatingUser(true);
    const updatedUser = {
      ...user,
      fullName,
      balance,
      phone,
    };
    await updateUser(updatedUser);
    setUpdatingUser(false);
    navigate("/dashboard");
  };

  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(false);

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

    setLoadingUser((v) => false);
    setUser(data);
    setFullName(data.fullName);
    setEmail(data.email);
    setBalance(data.balance);
    setPhone(data.phone);
  };

  useEffect(() => {
    loadUser();
  }, [parsed.email]);

  if (!loggedInUser)
    return (
      <div className="fixed h-screen w-screen top-0 justify-center flex flex-col items-center bg-opacity-50">
        <Link to="/">
          <img src={GreenLight} alt="" width="100px" />
        </Link>
        <p className="my-6">UnAuthorized.</p>
      </div>
    );

  return (
    <section className="py-24 md:py-32 bg-white white-bg-image ">
      {user && !loadingUser && (
        <div className="container px-4 mx-auto">
          <div className="max-w-sm mx-auto">
            <div className="mb-6 text-center">
              <Link className="inline-block mb-6" to="/">
                <img src={GreenLight} alt="" width="100px" />
              </Link>
              <div className="flex justify-center">
                <small
                  className="  font-medium flex cursor-pointer"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  &#8249; Back to Dashboard
                </small>
              </div>
              <h3 className="mb-4 text-2xl md:text-3xl font-bold">
                User Details
              </h3>
            </div>

            <form onSubmit={onSubmit}>
              <div className="mb-6">
                <label
                  className="block mb-2 text-coolGray-800 font-medium"
                  htmlFor=""
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 "
                  type="email"
                  placeholder="name@email.com"
                  required
                  disabled={true}
                  contentEditable={false}
                  title="Email"
                  about="Email Address"
                  alt="Email Address"
                  defaultValue={email}
                />
                <label
                  className="block mb-2 text-coolGray-800 font-medium"
                  htmlFor=""
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 "
                  type="text"
                  placeholder="John Doe"
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={updatingUser}
                  contentEditable={!updatingUser}
                  title="Full Name"
                  about="Full Name"
                  alt="Full Name"
                  defaultValue={fullName}
                />
                <label
                  className="block mb-2 text-coolGray-800 font-medium"
                  htmlFor=""
                >
                  Phone
                </label>
                <input
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 "
                  type="tel"
                  placeholder="080 000 0000"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  disabled={updatingUser}
                  contentEditable={!updatingUser}
                  title="Phone"
                  about="Phone"
                  alt="Phone"
                  defaultValue={phone}
                  maxLength={11}
                />
                <label
                  className="block mb-2 text-coolGray-800 font-medium"
                  htmlFor=""
                >
                  Balance
                </label>
                <div className="flex items-center relative">
                  <span className="absolute left-3">₦</span>
                  <input
                    className={`appearance-none block w-full p-3 leading-5 text-coolGray-900 px-6 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 `}
                    type="number"
                    placeholder="500,000.00"
                    onChange={(e) => setBalance(Number(e.target.value))}
                    required
                    disabled={updatingUser}
                    contentEditable={!updatingUser}
                    title="Balance"
                    about="Account Balance"
                    alt="Account Balance"
                    step="0.01"
                    defaultValue={balance}
                  />
                </div>
              </div>

              <>
                <button
                  className="flex justify-center  py-3 px-7 my-6 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
                  disabled={updatingUser}
                  type="submit"
                >
                  {updatingUser && (
                    <svg
                      className="animate-spin h-5 w-5 mr-3 rounded-full border-t-2 border-r-2 border-white"
                      viewBox="0 0 24 24"
                    ></svg>
                  )}
                  Update Details
                </button>
                <small className=" text-red-500 font-medium ">{error}</small>
              </>
            </form>
          </div>
        </div>
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
