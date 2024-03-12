import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault();
    axios
      .post("/register", {
        name,
        email,
        password,
      })
      .then(() => {
        enqueueSnackbar("Registered Successfully", { variant: "success" });
        navigate("/");
      })
      .catch(() => {
        enqueueSnackbar("Registration Failed/Username not available", {
          variant: "error",
        });
      });
  };

  return (
    <div className=" mt-40">
      <div className=" text-center font-bold uppercase mt-4 text-2xl">
        Register
      </div>
      <form
        onSubmit={handleRegistration}
        className="flex flex-col max-w-md m-auto gap-4 mt-4"
      >
        <input
          type="text"
          placeholder="Your username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=" border-2 border-gray-300 rounded-md h-10"
        />
        <input
          type="email"
          placeholder="xyz@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" border-2 border-gray-300 rounded-md h-10"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" border-2 border-gray-300 rounded-md h-10"
        />
        <button className=" bg-red-500 w-full rounded-lg text-white h-10">
          Register
        </button>
        <h3 className=" text-center">
          Already a user?
          <Link to="/login" className=" underline font-bold ">
            Login
          </Link>
        </h3>
      </form>
    </div>
  );
};

export default RegisterPage;
