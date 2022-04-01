import React from "react";

const toArray = (stringArray) => stringArray?.replace(/\[|\]/g, "").split(",");

const PricingExample = ({ setMonthlyPlan, monthlyPlan, pricingData }) => {
  return (
    <div>
      <header className="bg-black mb-8">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-end">
          <ul className="list-reset hidden lg:flex items-center w-full">
            <li className="mr-4">
              <a href="#example" className="pb-2 text-white no-underline">
                Features
              </a>
            </li>
            <li className="mr-4">
              <a href="#example" className="pb-2 text-white no-underline">
                Business
              </a>
            </li>
            <li className="mr-4">
              <a href="#example" className="pb-2 text-white no-underline">
                Explore
              </a>
            </li>
            <li className="mr-4">
              <a href="#example" className="pb-2 text-white no-underline">
                Marketplace
              </a>
            </li>
            <li className="md:flex-1">
              <a
                href="#example"
                className="pb-2 text-white no-underline border-b-2 border-grey-dark"
              >
                Pricing
              </a>
            </li>
            <li className="mr-4">
              <input
                type="text"
                placeholder="Search GitHub"
                className="w-48 p-2 bg-grey-darkest text-grey text-sm rounded"
              />
            </li>
            <li className="text-grey-darker">
              <a href="#example" className="text-white no-underline font-bold">
                Sign in
              </a>{" "}
              or{" "}
              <a href="#example" className="text-white no-underline font-bold">
                Sign up
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8 leading-normal">
        <h1 className="mb-4 text-center text-4xl md:text-5xl font-light text-grey-darkest">
          {pricingData?.title}
        </h1>
        <p className="max-w-lg mx-auto mb-6 font-light text-center text-grey-dark text-xl">
          {pricingData?.description}
        </p>
        <div className="flex justify-center my-4">
          <label
            className="form-check-label inline-block text-gray-800 mx-2"
            htmlFor=""
          >
            Monthly
          </label>
          <div className="form-check form-switch">
            <input
              className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={!monthlyPlan}
              onChange={() => {
                setMonthlyPlan(!monthlyPlan);
              }}
            />
          </div>
          <label
            className="form-check-label inline-block text-gray-800 mx-2"
            htmlFor="flexSwitchCheckDefault"
          >
            Yearly
          </label>
        </div>
        {/* pricing cards container */}
        <div className="flex flex-wrap -mx-2 mb-8 justify-center">
          {/* Single card */}
          <div className="flex w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <div className="border rounded shadow text-sm flex flex-grow flex-col">
              <h2 className="p-2 text-center text-indigo text-xl border-b">
                {pricingData?.freeTitle}
              </h2>
              <div className="px-6 py-8 border-b text-center flex-grow">
                <p className="mb-4">
                  <span className="block font-bold text-4xl">
                    ${pricingData?.freePrice}
                  </span>{" "}
                  <span className="text-grey-dark">
                    {monthlyPlan ? "per month" : "per year"}
                  </span>
                </p>
                <strong>Includes:</strong>
                <ul className="list-reset mb-4">
                  {toArray(pricingData?.freeFeatures)?.map((item, index) => (
                    <li key={index} className="mb-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="p-3 text-indigo text-lg font-bold hover:text-white hover:bg-blue"
              >
                {pricingData?.freeButton}
              </button>
            </div>
          </div>
          {/* End of single card */}
          {/* Single card */}
          <div className="flex w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <div className="border rounded shadow text-sm flex flex-grow flex-col">
              <h2 className="p-2 text-center text-indigo text-xl border-b">
                {pricingData?.proTitle}
              </h2>
              <div className="px-6 py-8 border-b text-center flex-grow">
                <p className="mb-4">
                  <span className="block font-bold text-4xl">
                    ${pricingData?.proPrice}
                  </span>{" "}
                  <span className="text-grey-dark">
                    {monthlyPlan ? "per month" : "per year"}
                  </span>
                </p>
                <strong>Includes:</strong>
                <ul className="list-reset mb-4">
                  {toArray(pricingData?.proFeatures)?.map((item, index) => (
                    <li key={index} className="mb-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="p-3 text-indigo text-lg font-bold hover:text-white hover:bg-blue"
              >
                {pricingData?.proButton}
              </button>
            </div>
          </div>
          {/* End of single card */}
          {/* Single card */}
          <div className="flex w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <div className="border rounded shadow text-sm flex flex-grow flex-col">
              <h2 className="p-2 text-center text-indigo text-xl border-b">
                Developer
              </h2>
              <div className="px-6 py-8 border-b text-center flex-grow">
                <p className="mb-4">
                  <span className="block font-bold text-4xl">
                    ${pricingData?.enterprisePrice}
                  </span>{" "}
                  <span className="text-grey-dark">
                    {monthlyPlan ? "per month" : "per year"}
                  </span>
                </p>
                <strong>Includes:</strong>
                <ul className="list-reset mb-4">
                  {toArray(pricingData?.enterpriseFeatures)?.map(
                    (item, index) => (
                      <li key={index} className="mb-2">
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <button
                type="button"
                className="p-3 text-indigo text-lg font-bold hover:text-white hover:bg-blue"
              >
                {pricingData?.enterpriseButton}
              </button>
            </div>
          </div>
          {/* End of single card */}
        </div>
        {/* end of cards container */}
      </main>
    </div>
  );
};

export default PricingExample;
