import React from "react";
import { useState } from "react";
import Button from "../components/Button";

const Users = () => {
  const [users, setUsers] = useState([
    {
      firstName: "Mohammad",
      lastName: "Waliullah",
      _id: 1,
    },
  ]);
  return (
    <div className="my-4">
      <div className="font-bold text-lg">Users</div>
      <div>
        <input
          type="text"
          placeholder={"Search users..."}
          className="border px-3 py-2 w-full rounded my-2"
        />
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </div>
  );
};

export const User = ({ user }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-center items-center">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center mr-2">
          <div>{user.firstName[0]}</div>
        </div>
        <div className="font-medium">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div>
        <Button label={"Send money"} />
      </div>
    </div>
  );
};

export default Users;
