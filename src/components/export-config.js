import React from "react";
import { toArray } from "./utils";

const ExportConfig = () => {
  const jsonFileUrl = {
    globale:
      "https://raw.githubusercontent.com/Saleemnestorx/monthly-yearly-config/main/react-example.json",
    yearly:
      "https://raw.githubusercontent.com/Saleemnestorx/monthly-yearly-config/main/yearly-plan.json",
    monthly:
      "https://raw.githubusercontent.com/Saleemnestorx/monthly-yearly-config/main/monthly-plan",
  };
  const jsonFileDownload = async (value) => {
    const githubExportedData = await getMoviesFromApiAsync(value);
    const fileName = `${value}.json`;
    const data = new Blob([JSON.stringify(githubExportedData)], {
      type: "text/json",
    });
    const jsonURL = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute("download", fileName);
    link.click();
    document.body.removeChild(link);
  };
  const getMoviesFromApiAsync = (value) => {
    return fetch(jsonFileUrl[value])
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  return (
    <div>
      <div className=" relative inline-block w-60 text-gray-700">
        <select
          className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
          placeholder="Regular input"
          onChange={(e) => jsonFileDownload(e.target.value)}
          value="Export Config"
        >
          <option value={""} disabled>
            Export Config
          </option>
          <option value={"globale"}>Global config</option>
          <option value={"yearly"}>Yearly plan config</option>
          <option value={"monthly"}>Monthly plan config</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ExportConfig;
