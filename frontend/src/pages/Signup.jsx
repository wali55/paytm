import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Signup = () => {
  const initialData = {
    firstName: "",
    lastName: "",
    username: "",
    password: ""
  }
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signup", formData);
      localStorage.setItem("token", res?.data?.token);
      setFormData(initialData);
      navigate("/dashboard");
    } catch (error) {
      console.log('error', error);
    }
    
  }

  return (
    <div className="bg-gray-100 h-screen w-screen flex justify-center items-center">
        <div className="bg-white w-80 rounded-md p-8">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox onChange={handleChange} value={formData?.firstName} label={"First Name"} name="firstName" placeholder={"John"} />
          <InputBox onChange={handleChange} value={formData?.lastName} label={"Last Name"} name="lastName" placeholder={"Doe"} />
          <InputBox onChange={handleChange} value={formData?.username} label={"Email"} name="username" placeholder={"johndoe@example.com"} />
          <InputBox onChange={handleChange} value={formData?.password} label={"Password"} name="password" placeholder={""} />
          <Button label={"Sign up"} onClick={handleSubmit} />
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
    </div>
  );
};

export default Signup;
