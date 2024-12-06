import React, { useState } from 'react'
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import axios from "axios";
import { useSearchParams } from 'react-router-dom';

const SendMoney = () => {
  const [amount, setAmount] = useState("");
  const  [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/api/v1/account/transfer",
        {
          amount,
          to: id
        },
        {
          headers: {
            Authorization: token
          }
        }
      )
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white w-80 rounded-lg p-6">
        <Heading label={"Send money"} />
        <div className="my-6 flex items-center">
          <div className="h-8 w-8 rounded-full bg-lime-600 text-white font-semibold mr-2 flex justify-center items-center">
            <div>{name[0]}</div>
            
          </div>
          <div className="font-medium">{name}</div>
        </div>
        <InputBox onChange={(e) => setAmount(e.target.value)} value={amount} label={"Amount in ($)"} placeholder={"Enter amount"} />
        <button onClick={handleSubmit} className="w-full py-2 px-3 rounded-md bg-lime-600 hover:bg-lime-500 font-medium my-4 text-white">Send Money</button>
      </div>
    </div>
  )
}

export default SendMoney