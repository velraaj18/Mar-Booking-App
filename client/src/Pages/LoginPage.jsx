import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { UserContext } from "../../UserContext";

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      enqueueSnackbar("Successfully logged in", { variant: "success" });

      navigate("/");
    } catch (err) {
      console.error(err);
      enqueueSnackbar("user/password not matched", { variant: "error" });
    }
  };
  return (
    <div className=" mt-40">
      <div className=" text-center font-bold uppercase mt-4 text-2xl">
        login
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-md m-auto gap-4 mt-4"
      >
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
        <button className=" bg-red-500 w-full rounded-lg text-white h-10 uppercase">
          Login
        </button>
        <h3 className=" text-center">
          New User?
          <Link to="/register" className=" font-bold underline">
            Create a new account
          </Link>
        </h3>
      </form>
    </div>
  );
};

export default LoginPage;
