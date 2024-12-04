import React from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";

const Dashboard = () => {
  return (
    <div>
      <AppBar />
      <div className="mx-5 my-4">
        <Balance value={10000} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
