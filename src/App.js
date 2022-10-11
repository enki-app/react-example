import React, { useState, useEffect } from "react";
import PricingExample from "./components/pricing-example";
import SimpleForm from "./components/simple-form";
import KonfigsSdk from "konfigs-sdk";
import { jsonParser } from "./components/utils";

function App() {
  const [pricingData, setPricingData] = useState();
  const [monthlyPlan, setMonthlyPlan] = useState();
  const [settings, setSettings] = useState({
    defaultSubscription: "",
    pricingToggle: false,
  });
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    apiKey: "",
    applicationID: "",
    enodeId: "",
    ynodeId: "",
    mnodeId: "",
  });
  const [dataTofetch, setDataTofetch] = useState({
    apiKey: "ea576068-0380-4ddd-a85b-8b92f6faa631",
    applicationID: "2ec391ec-0edf-403e-8144-9397537d31c0",
    enodeId: "0eb10f5d-6e0c-420a-b0c0-1159cd204bfe",
    ynodeId: "23a26122-751c-4be8-b066-728fc3cc2b7b",
    mnodeId: "cd66286d-339c-4b75-8dca-709f6935d1f6",
  });
  const enkiSdk = new KonfigsSdk(
    dataTofetch.apiKey,
    dataTofetch.applicationID,
    "PROD",
    "https://api.konfigs.io/graphql"
  );
  const handelSaveForm = async () => {
    await setDataTofetch(formData);
    const initialData = getDataAsync(dataTofetch.enodeId);
    initialData
      ?.then((data) => {
        setSettings({
          defaultSubscription: data?.defaultSubscription,
          pricingToggle: jsonParser(data?.pricingToggle),
        });
      })
      .catch(() => setError(true));
  };

  const getDataAsync = async (nodeId) =>
    await enkiSdk?.getFlattenedConfigs(nodeId);
  useEffect(() => {
    const initialData = getDataAsync(dataTofetch.enodeId);
    initialData?.then((data) => {
      setSettings({
        defaultSubscription: data?.defaultSubscription,
        pricingToggle: jsonParser(data?.pricingToggle),
      });
    });
  }, []);
  useEffect(() => {
    if (settings?.pricingToggle) {
      if (settings?.defaultSubscription === "monthly") {
        getDataAsync(dataTofetch.mnodeId)
          .then((data) => {
            console.log("data", data);
            setPricingData(data);
            setMonthlyPlan(true);
            setError(false);
          })
          .catch(() => setError(true));
      } else if (settings?.defaultSubscription === "yearly") {
        getDataAsync(dataTofetch.ynodeId)
          .then((data) => {
            setPricingData(data);
            setMonthlyPlan(false);
            setError(false);
          })
          .catch(() => setError(true));
      }
    } else {
      if (settings?.defaultSubscription === "monthly") {
        getDataAsync(dataTofetch.mnodeId)
          .then((data) => {
            setPricingData(data);
            setMonthlyPlan(true);
            setError(false);
          })
          .catch(() => setError(true));
      } else if (settings?.defaultSubscription === "yearly") {
        getDataAsync(dataTofetch.ynodeId)
          .then((data) => {
            setPricingData(data);
            setMonthlyPlan(false);
            setError(false);
          })
          .catch(() => setError(true));
      }
    }
  }, [settings]);

  useEffect(() => {
    const data = getDataAsync(
      monthlyPlan ? dataTofetch.mnodeId : dataTofetch.ynodeId
    );
    data
      .then((res) => {
        setPricingData(res);
        setError(false);
      })
      .catch(() => setError(true));
  }, [monthlyPlan]);
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <PricingExample
        setMonthlyPlan={setMonthlyPlan}
        monthlyPlan={monthlyPlan}
        pricingData={pricingData}
        settings={settings}
        formData={formData}
        onChange={onChange}
        handelSaveForm={handelSaveForm}
        error={error}
      />
    </div>
  );
}

export default App;
