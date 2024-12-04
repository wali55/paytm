import React from 'react'
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";

const SendMoney = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white w-80 rounded-lg p-6">
        <Heading label={"Send money"} />
        <div className="my-6 flex items-center">
          <div className="h-8 w-8 rounded-full bg-lime-600 text-white font-semibold mr-2 flex justify-center items-center">
            <div>A</div>
            
          </div>
          <div className="font-medium">Friend's Name</div>
        </div>
        <InputBox label={"Amount in ($)"} placeholder={"Enter amount"} />
        <button className="w-full py-2 px-3 rounded-md bg-lime-600 hover:bg-lime-500 font-medium my-4 text-white">Send Money</button>
      </div>
    </div>
  )
}

export default SendMoney