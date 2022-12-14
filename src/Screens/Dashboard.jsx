import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../firebase/index.ts";
import formatPrice from "../utils/formatPrice.ts";
import FuzzySearch from "fuzzy-search";
import { auth } from "../firebase/index.ts";
import GreenLight from "../assets/bgl-removebg-preview.png";
import { signOut } from "firebase/auth";

export default function Dashboard() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [query, setQuery] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  const searcher = new FuzzySearch(users, ["fullName", "balance", "email"], {
    caseSensitive: false,
  });
  const filteredUsers = searcher.search(query);

  const loadUsers = async () => {
    setLoadingUsers(true);
    const usersList = await getUsers();
    setLoadingUsers((v) => false);
    setUsers(usersList);
  };

  const signUserOut = async () => {
    setLoggingOut(true);
    signOut(auth)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {});
    setLoggingOut(false);
  };

  useEffect(() => {
    loadUsers();
  }, [user]);

  const UserItem = ({ user }) => {
    const [deleting, setDeleting] = useState(false);
    const removeUser = async () => {
      const userEmail = prompt(`Enter ${user.email} to confirm delete.`);
      if (userEmail !== user.email) {
        return;
      }
      setDeleting(true);

      await deleteUser(user.email);
      const currentUsers = [...users].filter((i) => i.email !== user.email);
      setUsers(currentUsers);

      setDeleting((v) => false);
    };

    return (
      <tr className="p-3 border-b border-coolGray-100">
        <th className="whitespace-nowrap px-4 py-2 bg-white text-left">
          <div className="flex items-center -m-2">
            <div className="w-auto p-2">
              <p className="text-xs font-semibold text-coolGray-800">
                <Link to={`/user?email=${user.email}`}>{user.fullName}</Link>
              </p>
            </div>
          </div>
        </th>
        <th className="whitespace-nowrap px-4 py-2 bg-white text-sm font-medium text-coolGray-800 text-left">
          <Link to={`/user?email=${user.email}`}>{user.email}</Link>
        </th>
        <th className="whitespace-nowrap px-4 py-2 bg-white text-sm font-medium text-coolGray-800 text-left">
          <Link to={`/user?email=${user.email}`}>{user.phone || "--"}</Link>
        </th>

        <th className="whitespace-nowrap px-4 py-2 bg-white text-sm font-medium text-green-500 text-left">
          {formatPrice(user.balance)}
        </th>
        <th
          onClick={removeUser}
          className="whitespace-nowrap cursor-pointer px-4 py-2 bg-white text-sm font-medium text-green-500 text-left flex items-center"
        >
          Delete{" "}
          {deleting && (
            <svg
              className="animate-spin h-3 w-3 mr-3 rounded-full border-t-2 border-r-2 border-black ml-2"
              viewBox="0 0 24 24"
            ></svg>
          )}
        </th>
      </tr>
    );
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
    <div>
      <section className="bg-white p-8">
        <div className="flex flex-wrap items-center -m-2">
          <div className="w-full md:w-1/2 p-2">
            <h2 className="mb-2 font-semibold text-black text-3xl flex items-center">
              Dashboard{" "}
              {loadingUsers && (
                <svg
                  className="animate-spin h-5 w-5 mr-3 rounded-full border-t-2 border-r-2 border-black ml-2"
                  viewBox="0 0 24 24"
                ></svg>
              )}
            </h2>
            <p className="text-coolGray-500 font-medium">
              Clients and their current balance{" "}
            </p>
          </div>
          <div className="w-full md:w-1/2 p-2">
            <div className="flex flex-wrap justify-end -m-2">
              <div className="w-full md:w-auto p-2">
                <button
                  onClick={signUserOut}
                  className="flex flex-wrap items-center justify-center py-3 px-4 w-full text-base text-white font-medium bg-red-500 hover:bg-red-600 rounded-md shadow-button"
                >
                  <span>Log Out</span>
                  {loggingOut && (
                    <svg
                      className="animate-spin h-5 w-5 mr-3 rounded-full border-t-2 border-r-2 border-white ml-2"
                      viewBox="0 0 24 24"
                    ></svg>
                  )}
                </button>
              </div>
              <div className="w-full md:w-auto p-2">
                <button
                  onClick={() => {
                    navigate("/add-user");
                  }}
                  className="flex flex-wrap items-center justify-center py-3 px-4 w-full text-base text-white font-medium bg-green-500 hover:bg-green-600 rounded-md shadow-button"
                >
                  <svg
                    className="mr-2"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0V0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1572 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18V18ZM14 9H11V6C11 5.73478 10.8946 5.48043 10.7071 5.29289C10.5196 5.10536 10.2652 5 10 5C9.73479 5 9.48043 5.10536 9.2929 5.29289C9.10536 5.48043 9 5.73478 9 6V9H6C5.73479 9 5.48043 9.10536 5.2929 9.29289C5.10536 9.48043 5 9.73478 5 10C5 10.2652 5.10536 10.5196 5.2929 10.7071C5.48043 10.8946 5.73479 11 6 11H9V14C9 14.2652 9.10536 14.5196 9.2929 14.7071C9.48043 14.8946 9.73479 15 10 15C10.2652 15 10.5196 14.8946 10.7071 14.7071C10.8946 14.5196 11 14.2652 11 14V11H14C14.2652 11 14.5196 10.8946 14.7071 10.7071C14.8946 10.5196 15 10.2652 15 10C15 9.73478 14.8946 9.48043 14.7071 9.29289C14.5196 9.10536 14.2652 9 14 9Z"
                      fill="#D5DAE1"
                    ></path>
                  </svg>
                  <span>Add User</span>
                </button>
              </div>
              <div className="w-full md:w-auto p-2">
                <button
                  onClick={() => {
                    navigate("/admin-signup");
                  }}
                  className="flex flex-wrap items-center justify-center py-3 px-4 w-full text-base text-white font-medium bg-green-500 hover:bg-green-600 rounded-md shadow-button"
                >
                  <svg
                    className="mr-2"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0V0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1572 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18V18ZM14 9H11V6C11 5.73478 10.8946 5.48043 10.7071 5.29289C10.5196 5.10536 10.2652 5 10 5C9.73479 5 9.48043 5.10536 9.2929 5.29289C9.10536 5.48043 9 5.73478 9 6V9H6C5.73479 9 5.48043 9.10536 5.2929 9.29289C5.10536 9.48043 5 9.73478 5 10C5 10.2652 5.10536 10.5196 5.2929 10.7071C5.48043 10.8946 5.73479 11 6 11H9V14C9 14.2652 9.10536 14.5196 9.2929 14.7071C9.48043 14.8946 9.73479 15 10 15C10.2652 15 10.5196 14.8946 10.7071 14.7071C10.8946 14.5196 11 14.2652 11 14V11H14C14.2652 11 14.5196 10.8946 14.7071 10.7071C14.8946 10.5196 15 10.2652 15 10C15 9.73478 14.8946 9.48043 14.7071 9.29289C14.5196 9.10536 14.2652 9 14 9Z"
                      fill="#D5DAE1"
                    ></path>
                  </svg>
                  <span>Add Admin</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-coolGray-50 py-4">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center justify-between -m-2 mb-4">
            <div className="w-full md:w-1/2 p-2">
              <p className="font-semibold text-xl text-coolGray-800">
                All Customers
              </p>
              <p className="font-medium text-sm text-coolGray-500">
                {users.length} Customer{users.length > 1 && "s"}
              </p>
            </div>
            <div className="w-full md:w-1/2 p-2">
              <div className="relative md:max-w-max md:ml-auto">
                <svg
                  className="absolute left-3 transform top-1/2 -translate-y-1/2"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.0467 11.22L12.6667 9.80667C12.3699 9.5245 11.9955 9.33754 11.5916 9.26983C11.1876 9.20211 10.7727 9.25673 10.4001 9.42667L9.80008 8.82667C10.5071 7.88194 10.83 6.70445 10.7038 5.53122C10.5775 4.358 10.0115 3.27615 9.1197 2.50347C8.22787 1.73078 7.07643 1.32464 5.89718 1.36679C4.71794 1.40894 3.59844 1.89626 2.76405 2.73065C1.92967 3.56503 1.44235 4.68453 1.4002 5.86378C1.35805 7.04302 1.76419 8.19446 2.53687 9.08629C3.30956 9.97812 4.3914 10.5441 5.56463 10.6704C6.73786 10.7966 7.91535 10.4737 8.86007 9.76667L9.45341 10.36C9.26347 10.7331 9.1954 11.1564 9.25879 11.5702C9.32218 11.984 9.51383 12.3675 9.80674 12.6667L11.2201 14.08C11.5951 14.4545 12.1034 14.6649 12.6334 14.6649C13.1634 14.6649 13.6717 14.4545 14.0467 14.08C14.2372 13.8937 14.3886 13.6713 14.4919 13.4257C14.5953 13.1802 14.6485 12.9164 14.6485 12.65C14.6485 12.3836 14.5953 12.1198 14.4919 11.8743C14.3886 11.6287 14.2372 11.4063 14.0467 11.22ZM8.39341 8.39333C7.9269 8.85866 7.33294 9.1753 6.68657 9.30323C6.0402 9.43117 5.37041 9.36466 4.76181 9.11212C4.15321 8.85958 3.63312 8.43234 3.26722 7.88436C2.90132 7.33638 2.70603 6.69224 2.70603 6.03333C2.70603 5.37442 2.90132 4.73029 3.26722 4.18231C3.63312 3.63433 4.15321 3.20708 4.76181 2.95454C5.37041 2.702 6.0402 2.6355 6.68657 2.76343C7.33294 2.89137 7.9269 3.208 8.39341 3.67333C8.70383 3.98297 8.95012 4.35081 9.11816 4.75577C9.2862 5.16074 9.3727 5.59488 9.3727 6.03333C9.3727 6.47178 9.2862 6.90592 9.11816 7.31089C8.95012 7.71586 8.70383 8.08369 8.39341 8.39333ZM13.1067 13.1067C13.0448 13.1692 12.971 13.2187 12.8898 13.2526C12.8086 13.2864 12.7214 13.3039 12.6334 13.3039C12.5454 13.3039 12.4583 13.2864 12.377 13.2526C12.2958 13.2187 12.2221 13.1692 12.1601 13.1067L10.7467 11.6933C10.6843 11.6314 10.6347 11.5576 10.6008 11.4764C10.567 11.3951 10.5495 11.308 10.5495 11.22C10.5495 11.132 10.567 11.0449 10.6008 10.9636C10.6347 10.8824 10.6843 10.8086 10.7467 10.7467C10.8087 10.6842 10.8825 10.6346 10.9637 10.6007C11.0449 10.5669 11.1321 10.5495 11.2201 10.5495C11.3081 10.5495 11.3952 10.5669 11.4765 10.6007C11.5577 10.6346 11.6314 10.6842 11.6934 10.7467L13.1067 12.16C13.1692 12.222 13.2188 12.2957 13.2527 12.3769C13.2865 12.4582 13.3039 12.5453 13.3039 12.6333C13.3039 12.7213 13.2865 12.8085 13.2527 12.8897C13.2188 12.971 13.1692 13.0447 13.1067 13.1067Z"
                    fill="#BBC3CF"
                  ></path>
                </svg>
                <input
                  className="w-full md:w-64 pl-8 pr-4 py-2 text-sm text-coolGray-400 font-medium outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mb-6 border border-coolGray-100"></div>
          <div className="overflow-hidden border border-coolGray-100 rounded-md shadow-dashboard">
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  <tr className="whitespace-nowrap h-11 bg-coolGray-50 bg-opacity-80 border-b border-coolGray-100">
                    <th className="px-4 py-2 font-semibold text-xs text-coolGray-500 uppercase text-left">
                      <div className="flex items-center">
                        <p>Name</p>
                      </div>
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-semibold text-xs text-coolGray-500 uppercase text-left">
                      Email
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-semibold text-xs text-coolGray-500 uppercase text-left">
                      Phone
                    </th>

                    <th className="whitespace-nowrap px-4 py-2 font-semibold text-xs text-coolGray-500 uppercase text-left">
                      Balance
                    </th>

                    <th className="whitespace-nowrap font-semibold text-xs text-coolGray-500 uppercase text-center"></th>
                  </tr>
                  {filteredUsers
                    .sort((a, b) => a.fullName.localeCompare(b.fullName))
                    .map((user, index) => (
                      <UserItem user={user} key={index} />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
