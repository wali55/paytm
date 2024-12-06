import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const initialData = {
    username: "",
    password: ""
  }

  const [formData, setFormData] = useState(initialData);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signin", formData);
      localStorage.setItem("token", res?.data?.token);
      navigate("/dashboard");
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <div className="bg-gray-100 h-screen w-screen flex justify-center items-center">
      <div className="bg-white w-80 rounded-md p-8">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={handleChange} name="username" value={formData.username} label={"Email"} placeholder={"johndoe@example.com"} />
        <InputBox onChange={handleChange} name="password" value={formData.password} label={"Password"} placeholder={""} />
        <Button label={"Sign in"} onClick={handleSubmit} />
        <BottomWarning
          label={"Don't have an account?"}
          buttonText={"Sign up"}
          to={"/signup"}
        />
      </div>
    </div>
  );
};

export default Signin;
