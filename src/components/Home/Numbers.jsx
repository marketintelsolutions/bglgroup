import React from "react";

export default function Numbers() {
  return (
    <section
      className="py-20 xl:pt-24 xl:pb-32 bg-white white-bg-image"
      id="Numbers"
    >
      <div className="container px-4 mx-auto">
        <div className="text-center">
          <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-9xl">
            Numbers
          </span>
          <h3 className="mb-4 text-4xl md:text-5xl text-coolGray-900 font-bold tracking-tighter">
            We believe in the power of data
          </h3>
          <p className="mb-16 xl:mb-24 mx-auto text-lg md:text-xl text-coolGray-500 font-medium max-w-4xl">
            With Shareholders Funds in excess of N49bn (USD 300MM) and a
            presence in 28 locations throughout Nigeria, BGL is uniquely
            positioned to provide unri- valled full fledged investment banking
            services.
          </p>
          <div className="flex flex-wrap justify-center -mx-4">
            <div className="w-full md:w-1/3 lg:w-1/4 px-4 mb-8 lg:mb-0">
              <h2 className="mb-2 text-4xl md:text-5xl text-coolGray-900 font-bold tracking-tighter">
                $300m
              </h2>
              <p className="text-lg md:text-xl text-coolGray-500 font-medium">
                Funds
              </p>
            </div>

            <div className="w-full md:w-1/3 lg:w-1/4 px-4 mb-8 lg:mb-0">
              <h2 className="mb-2 text-4xl md:text-5xl text-coolGray-900 font-bold tracking-tighter">
                + 235,000
              </h2>
              <p className="text-lg md:text-xl text-coolGray-500 font-medium">
                Projects completed
              </p>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4 px-4">
              <h2 className="mb-2 text-4xl md:text-5xl text-coolGray-900 font-bold tracking-tighter">
                28
              </h2>
              <p className="text-lg md:text-xl text-coolGray-500 font-medium">
                Locations
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
