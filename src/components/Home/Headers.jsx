import React, { useState } from "react";
import { ReactComponent as FiveSVG } from "../../assets/flex-ui-green.svg";
import GreenLight from "../../assets/bgl-removebg-preview.png";
import EmailModal from "../Auth/EmailModal";
import { Link } from "react-router-dom";

export default function Headers() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <section className="overflow-hidden">
      <div className="relative overflow-hidden first-bg text-white">
        <div className="bg-transparent">
          <nav className="flex justify-between p-6 px-4">
            <div className="flex justify-between items-center w-full">
              <div className="w-1/2 xl:w-1/3">
                <a
                  className="block max-w-max text-green-500 text-3xl font-extrabold"
                  href="#"
                >
                  {/* <GreenLight className="h-8" /> */}
                  <img src={GreenLight} alt="" width="100px" />
                  {/* BGL */}
                </a>
              </div>
              <div className="w-1/2 xl:w-1/3">
                <ul className="hidden xl:flex xl:justify-center">
                  <li className="mr-12">
                    <a
                      className="text-coolGray-500 hover:text-coolGray-900 font-medium"
                      href="#About"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="mr-12">
                    <a
                      className="text-coolGray-500 hover:text-coolGray-900 font-medium"
                      href="#Numbers"
                    >
                      Numbers
                    </a>
                  </li>
                  <li className="mr-12">
                    <a
                      className="text-coolGray-500 hover:text-coolGray-900 font-medium"
                      href="#Contact"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-1/2 xl:w-1/3">
                <div className="hidden xl:flex items-center justify-end">
                  <Link
                    className="inline-block py-2 px-4 text-sm leading-5 border border-green-50 text-green-500 hover:text-green-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
                    // href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                    // download
                    // target="_blank"
                    to={"/login?purpose=account"}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
            <button className="navbar-burger self-center xl:hidden">
              <svg
                width="35"
                height="35"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  className="text-coolGray-50"
                  width="32"
                  height="32"
                  rx="6"
                  fill="currentColor"
                ></rect>
                <path
                  className="text-coolGray-500"
                  d="M7 12H25C25.2652 12 25.5196 11.8946 25.7071 11.7071C25.8946 11.5196 26 11.2652 26 11C26 10.7348 25.8946 10.4804 25.7071 10.2929C25.5196 10.1054 25.2652 10 25 10H7C6.73478 10 6.48043 10.1054 6.29289 10.2929C6.10536 10.4804 6 10.7348 6 11C6 11.2652 6.10536 11.5196 6.29289 11.7071C6.48043 11.8946 6.73478 12 7 12ZM25 15H7C6.73478 15 6.48043 15.1054 6.29289 15.2929C6.10536 15.4804 6 15.7348 6 16C6 16.2652 6.10536 16.5196 6.29289 16.7071C6.48043 16.8946 6.73478 17 7 17H25C25.2652 17 25.5196 16.8946 25.7071 16.7071C25.8946 16.5196 26 16.2652 26 16C26 15.7348 25.8946 15.4804 25.7071 15.2929C25.5196 15.1054 25.2652 15 25 15ZM25 20H7C6.73478 20 6.48043 20.1054 6.29289 20.2929C6.10536 20.4804 6 20.7348 6 21C6 21.2652 6.10536 21.5196 6.29289 21.7071C6.48043 21.8946 6.73478 22 7 22H25C25.2652 22 25.5196 21.8946 25.7071 21.7071C25.8946 21.5196 26 21.2652 26 21C26 20.7348 25.8946 20.4804 25.7071 20.2929C25.5196 20.1054 25.2652 20 25 20Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </nav>
          <div className="navbar-menu hidden fixed top-0 left-0 z-50 w-full h-full bg-coolGray-900 bg-opacity-50">
            <div className="fixed top-0 left-0 bottom-0 w-full w-4/6 max-w-xs bg-white">
              <nav className="relative p-6 h-full overflow-y-auto">
                <div className="flex flex-col justify-between h-full">
                  <a className="inline-block" href="#">
                    <FiveSVG className="h-8" />
                  </a>
                  <ul className="py-6">
                    <li>
                      <a
                        className="block py-3 px-4 text-coolGray-500 hover:text-coolGray-900 font-medium hover:bg-coolGray-50 rounded-md"
                        href="#About"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        className="block py-3 px-4 text-coolGray-500 hover:text-coolGray-900 font-medium hover:bg-coolGray-50 rounded-md"
                        href="#Numbers"
                      >
                        Numbers
                      </a>
                    </li>
                    <li>
                      <a
                        className="block py-3 px-4 text-coolGray-500 hover:text-coolGray-900 font-medium hover:bg-coolGray-50 rounded-md"
                        href="#Contact"
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                  <div className="flex flex-wrap">
                    <div className="w-full">
                      <Link
                        className="inline-block py-2 px-4 w-full text-sm leading-5 border-white text-green-500 hover:text-green-600 font-medium text-center focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
                        // href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                        // download
                        // target="_blank"
                        to={"/login?purpose=account"}
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
              </nav>
              <a className="navbar-close absolute top-5 p-4 right-3" href="#">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.94004 6L11.14 1.80667C11.2656 1.68113 11.3361 1.51087 11.3361 1.33333C11.3361 1.1558 11.2656 0.985537 11.14 0.860002C11.0145 0.734466 10.8442 0.66394 10.6667 0.66394C10.4892 0.66394 10.3189 0.734466 10.1934 0.860002L6.00004 5.06L1.80671 0.860002C1.68117 0.734466 1.51091 0.663941 1.33337 0.663941C1.15584 0.663941 0.985576 0.734466 0.860041 0.860002C0.734505 0.985537 0.66398 1.1558 0.66398 1.33333C0.66398 1.51087 0.734505 1.68113 0.860041 1.80667L5.06004 6L0.860041 10.1933C0.797555 10.2553 0.747959 10.329 0.714113 10.4103C0.680267 10.4915 0.662842 10.5787 0.662842 10.6667C0.662842 10.7547 0.680267 10.8418 0.714113 10.9231C0.747959 11.0043 0.797555 11.078 0.860041 11.14C0.922016 11.2025 0.99575 11.2521 1.07699 11.2859C1.15823 11.3198 1.24537 11.3372 1.33337 11.3372C1.42138 11.3372 1.50852 11.3198 1.58976 11.2859C1.671 11.2521 1.74473 11.2025 1.80671 11.14L6.00004 6.94L10.1934 11.14C10.2554 11.2025 10.3291 11.2521 10.4103 11.2859C10.4916 11.3198 10.5787 11.3372 10.6667 11.3372C10.7547 11.3372 10.8419 11.3198 10.9231 11.2859C11.0043 11.2521 11.0781 11.2025 11.14 11.14C11.2025 11.078 11.2521 11.0043 11.286 10.9231C11.3198 10.8418 11.3372 10.7547 11.3372 10.6667C11.3372 10.5787 11.3198 10.4915 11.286 10.4103C11.2521 10.329 11.2025 10.2553 11.14 10.1933L6.94004 6Z"
                    fill="#556987"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="pt-12 pb-28 md:pb-72">
          <div className="container px-4 mx-auto">
            <div className="mx-auto text-center max-w-3xl">
              <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight font-bold tracking-tighter">
                Africa's leading Investment Banking and Investment Group{" "}
              </h1>
              <p className="mb-8 mx-auto text-lg md:text-xl text-coolGray-500 font-medium max-w-3xl">
                BGL will actively seek the best opportunities to bring people
                and knowledge together to deliver values greater than the sum of
                its parts
              </p>
              <div className="flex w-full mx-auto max-w-[550px]  items-center justify-center">
                <div className="w-full  md:w-full py-1 md:py-0 md:mr-0">
                  <Link
                    className="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-green-500 rounded-md shadow-sm"
                    to="/scheme-of-arrangement"
                  >
                    Scheme of Arrangement
                  </Link>
                  <div className="mt-7 flex gap-5">
                    <Link
                      className=" inline-block py-3 px-1 w-full text-base md:text-lg leading-4 text-green-600 hover:text-white font-medium text-center bg-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-white rounded-md shadow-sm"
                      to="/Egm"
                      target="_blank"
                    >
                      AGM 2014 - 2024
                    </Link>
                    <Link
                      className=" inline-block break-keep  py-3 px-0 w-full text-base md:text-lg leading-4 text-green-600 hover:text-white font-medium text-center bg-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-white rounded-md shadow-sm"
                      to="/annual"
                      target="_blank"
                    >
                      Annual Report 2014 - 2024
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EmailModal
        isOpen={isOpen}
        closeModal={closeModal}
        openModal={openModal}
      />
    </section>
  );
}
