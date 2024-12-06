import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState("");
  const token = localStorage.getItem("token");

  const getBalance = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: token
        }
      })
      setBalance(res?.data?.balance)
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    getBalance();
  }, []);
  
  return (
    <div>
      <AppBar />
      <div className="mx-5 my-4">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
