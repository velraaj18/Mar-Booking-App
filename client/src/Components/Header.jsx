import React from "react";
import { FaAirbnb } from "react-icons/fa";
import { IoSearchCircleSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <div className=" flex justify-between mx-20 my-5 ">
      <Link to={"/"} className="flex items-center gap-1 cursor-pointer">
        <FaAirbnb className=" text-red-500 text-4xl font-bold " />
        <h1 className="text-2xl font-bold text-red-500">airbnb</h1>
      </Link>
      <div className="flex border border-gray-300 rounded-3xl shadow-md shadow-gray py-2 px-4 cursor-pointer">
        <div className=" px-3 font-semibold">Anywhere </div>
        <div className=" border-l-2 border-gray-400"></div>
        <div className=" px-3 font-semibold">Anyweek</div>
        <div className=" border-l-2 border-gray-400 "></div>
        <div className=" px-3 font-semibold text-gray-600">Add guests</div>
        <button className=" text-3xl text-red-500">
          <IoSearchCircleSharp />
        </button>
      </div>
      <Link
        to={user ? "/accounts" : "/login"}
        className="flex border border-gray-300 rounded-3xl shadow-md shadow-gray py-2 px-4 gap-3 items-center cursor-pointer"
      >
        <GiHamburgerMenu />
        <FaUserCircle className=" text-2xl text-gray-500" />
        {!!user && <div>{user.name}</div>}
      </Link>
    </div>
  );
};

export default Header;
