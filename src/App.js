import React, { useState, useEffect } from "react";
import PricingExample from "./components/pricing-example";
import SimpleForm from "./components/simple-form";
import EnkiSdk from "enki-sdk";
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
    apiKey: "744e9338-f8b0-4348-9fae-c6e6031dcda0",
    applicationID: "694fd052-cffe-4a42-ba53-222fe0c9fc35",
    enodeId: "96d8a793-ab79-4719-bb08-4229dc375367",
    ynodeId: "84c2469a-51b8-4f51-a60b-61e046a878b9",
    mnodeId: "410593bf-acac-4064-9ac7-2dafc4af3e0b",
  });
  const enkiSdk = new EnkiSdk(dataTofetch.apiKey, dataTofetch.applicationID);

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
      monthlyPlan ? dataTofetch.mnodeId : formData.ynodeId
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
