import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchedText, setSearchedText] = useState("");

   // Fetch all users or search based on filterText
  const fetchUsers = async (filterText = "") => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:3000/api/v1/user/bulk?filter=${filterText}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setUsers(res?.data?.returnedUsers || []);
    } catch (error) {
      console.log("error", error);
    }
  };

  // Debounced fetchUsers
  const debouchedFetchUsers = useCallback(debounce(fetchUsers, 500), []);

   // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle search input changes
  useEffect(() => {
    if (searchedText !== "") {
      debouchedFetchUsers(searchedText); // Fetch filtered users
    } else {
      fetchUsers(); // Fetch all users if search text is cleared
    }
  }, [searchedText, debouchedFetchUsers]);

  return (
    <div className="my-4">
      <div className="font-bold text-lg">Users</div>
      <div>
        <input
          type="text"
          onChange={(e) => setSearchedText(e.target.value)}
          value={searchedText}
          placeholder={"Search users..."}
          className="border px-3 py-2 w-full rounded my-2"
        />
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export const User = ({ user }) => {
  const navigate = useNavigate();
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
        <Button onClick={() => navigate(`/send?id=${user._id}&name=${user.lastName}`)} label={"Send money"} />
      </div>
    </div>
  );
};

export default Users;
