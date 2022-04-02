import React, { useState,useEffect } from "react";
import PricingExample from './components/pricing-example'
import EnkiSdk from 'enki-sdk'
import { jsonParser } from "./components/utils";

const TEST_API_KEY="744e9338-f8b0-4348-9fae-c6e6031dcda0"
const APPLIACTION_ID="694fd052-cffe-4a42-ba53-222fe0c9fc35"
const MONTHLY_NODE_ID="410593bf-acac-4064-9ac7-2dafc4af3e0b"
const YEARLY_NODE_ID="84c2469a-51b8-4f51-a60b-61e046a878b9"
const GLOBAL_NODE="96d8a793-ab79-4719-bb08-4229dc375367"



function App() {
  const enkiSdk = new EnkiSdk(TEST_API_KEY,APPLIACTION_ID)
  const [pricingData, setPricingData] = useState()
  const [monthlyPlan,setMonthlyPlan] = useState()
  const [settings,setSettings] = useState({
    defaultSubscription: "",
    pricingToggle: false,
  })

  const getDataAsync=async (nodeId)=>await enkiSdk?.getFlattenedConfigs(nodeId)
  useEffect( () => {
    const initialData=getDataAsync(GLOBAL_NODE)
    initialData?.then(data=>{
      setSettings({
        defaultSubscription: data?.defaultSubscription,
        pricingToggle: jsonParser(data?.pricingToggle),
      })

    })

  }, [])
  useEffect(()=>{
    if(settings?.pricingToggle){
      if(settings?.defaultSubscription==="monthly"){
        getDataAsync(MONTHLY_NODE_ID).then(data=>{
          setPricingData(data)
          setMonthlyPlan(true)
        })
      }else if(settings?.defaultSubscription==="yearly"){
        getDataAsync(YEARLY_NODE_ID).then(data=>{
          setPricingData(data)
          setMonthlyPlan(false)
        })
      }
    }else{
      if(settings?.defaultSubscription==="monthly"){
        getDataAsync(MONTHLY_NODE_ID).then(data=>{
          setPricingData(data)
          setMonthlyPlan(true)
        })
      }else if(settings?.defaultSubscription==="yearly"){
        getDataAsync(YEARLY_NODE_ID).then(data=>{
          setPricingData(data)
          setMonthlyPlan(false)
        })
      }
    }
  },[settings])
      
  useEffect( () => {

    const data = getDataAsync(monthlyPlan?MONTHLY_NODE_ID:YEARLY_NODE_ID)
    data.then(res=>{
      setPricingData(res)
    })
  }, [monthlyPlan])
  

  return (
<PricingExample setMonthlyPlan={setMonthlyPlan} monthlyPlan={monthlyPlan}
  pricingData={pricingData}
  settings={settings}

  />
  );
}

export default App;
