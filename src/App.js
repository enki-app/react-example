import React, { useState,useEffect } from "react";
import PricingExample from './components/pricing-example'
import EnkiSdk from 'enki-sdk'

const TEST_API_KEY="64b3d0a4-c3ae-4f33-bb5b-19d28cf8471d"
const APPLIACTION_ID="28c5daff-2623-435d-b897-b0010822e162"
const MONTHLY_NODE_ID="f4580aaa-4abf-4af7-8366-bf1aba133c20"
const YEARLY_NODE_ID="1cb558c7-4bed-4cfb-a884-228d4b571af3"

function App() {
  const enkiSdk = new EnkiSdk(TEST_API_KEY,APPLIACTION_ID)
  const [pricingData, setPricingData] = useState()
  const [monthlyPlan,setMonthlyPlan] = useState(true)

  const getDataAsync=async ()=>await enkiSdk.getFlattenedConfigs(monthlyPlan?MONTHLY_NODE_ID:YEARLY_NODE_ID)
  useEffect( () => {
    const data = getDataAsync()
    data.then(res=>{
      console.log(res)
      setPricingData(res)
    })
  }, [])
  useEffect( () => {
    const data = getDataAsync()
    data.then(res=>{
      console.log(res)
      setPricingData(res)
    })
  }, [monthlyPlan])
  

  return (
<PricingExample setMonthlyPlan={setMonthlyPlan} monthlyPlan={monthlyPlan}
  pricingData={pricingData}

  />
  );
}

export default App;
