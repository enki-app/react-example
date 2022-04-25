import React from "react";
import { toArray } from "./utils";
import exampleConfigTree from "./exampleConfigTree.png";
const SimpleForm = ({ formData, onChange, handelSaveForm, error }) => {
  const { apiKey, applicationID, enodeId, ynodeId, mnodeId } = formData;
  return (
    <div className="flex flex-wrap justify-center md:justify-between items-center w-8/12 mx-auto">
      <div className="w-11/12 md:w-8/12 order-last md:order-first">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="API key"
            >
              API key
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="apiKey"
              type="text"
              placeholder="API key"
              name={"apiKey"}
              value={apiKey}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="applicationID"
            >
              ApplicationID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="applicationID"
              type="text"
              placeholder="ApplicationID"
              name={"applicationID"}
              value={applicationID}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nodeId"
            >
              Global NodeId
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="enodeId"
              type="text"
              placeholder="Example  NodeId"
              name={"enodeId"}
              value={enodeId}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nodeId"
            >
              Yearly NodeId
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="ynodeId"
              type="text"
              placeholder="Yearly NodeId"
              name={"ynodeId"}
              value={ynodeId}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nodeId"
            >
              Monthly NodeId
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="mnodeId"
              type="text"
              placeholder="Monthly NodeId"
              name={"mnodeId"}
              value={mnodeId}
              onChange={onChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => handelSaveForm()}
            >
              save
            </button>
          </div>
          {error && (
            <div className=" text-sm text-red-700 mt-2">
              Make sure the data you added is correct
            </div>
          )}
        </form>
      </div>
      <div className="w-11/12 md:w-3/12 ">
        <img
          src={exampleConfigTree}
          class="max-w-10/12 md:max-w-sm h-auto transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
          alt=""
        />
      </div>
    </div>
  );
};

export default SimpleForm;
