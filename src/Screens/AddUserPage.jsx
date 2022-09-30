import React, { useState } from "react";
import GreenLight from "../assets/bgl-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import { checkUser, addUser } from "../firebase/index.ts";
import { auth } from "../firebase/index.ts";

export default function AddUserPage() {
  const user = auth.currentUser;

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [balance, setBalance] = useState();
  const [addingUser, setAddingUser] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleAddUser();
  };

  const handleAddUser = async () => {
    setError("");
    setsuccessMessage("");
    setAddingUser(true);
    const updatedUser = {
      fullName,
      balance,
      email,
      phone,
    };
    const { data, exists } = await checkUser(email);

    if (exists) {
      setAddingUser((v) => false);
      setError("User with this Email Exist.");
      return;
    }

    await addUser(updatedUser);
    setAddingUser(false);
    setsuccessMessage("New User Added");
    setEmail("");
    setBalance();
    setFullName("");
    setPhone("");
    setError("");
    document.getElementById("addNewUserForm").reset();

    // navigate("/dashboard");
  };

  if (!user)
    return (
      <div className="fixed h-screen w-screen top-0 justify-center flex flex-col items-center bg-opacity-50">
        <Link to="/">
          <img src={GreenLight} alt="" width="100px" />
        </Link>
        <p className="my-6">UnAuthorized.</p>
        <button
          onClick={() => {
            navigate("/admin-login");
          }}
          className="flex flex-wrap items-center justify-center py-3 px-4 text-base text-white font-medium bg-green-500 hover:bg-green-600 rounded-md shadow-button"
        >
          <span>Login</span>
        </button>
      </div>
    );

  return (
    <section className="py-24 md:py-32 bg-white white-bg-image ">
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
              Add New User
            </h3>
          </div>

          <form onSubmit={onSubmit} id="addNewUserForm">
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
                disabled={addingUser}
                contentEditable={!addingUser}
                title="Email"
                about="Email Address"
                alt="Email Address"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
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
                disabled={addingUser}
                contentEditable={!addingUser}
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
                disabled={addingUser}
                contentEditable={!addingUser}
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
                  disabled={addingUser}
                  contentEditable={!addingUser}
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
                <small className=" text-green-500 font-medium ">
                  {successMessage}
                </small>
              </div>
            </>
          </form>
        </div>
      </div>
    </section>
  );
}
