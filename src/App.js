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
    apiKey: "f34a8f59-f480-4d21-92af-73a4e1e13a44",
    applicationID: "e8675af9-4437-4a9e-80e3-0722fa895472",
    enodeId: "0c9aae55-9333-414f-b2ba-e255d563f799",
    ynodeId: "e1b57648-111a-4e49-ab22-fc6a1f6ef701",
    mnodeId: "76313e34-14da-472f-82f0-42defbf35efb",
  });
  const enkiSdk = new KonfigsSdk(dataTofetch.apiKey, dataTofetch.applicationID);

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
