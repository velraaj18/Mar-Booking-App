import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacePage from "./PlacePage";
import AccountNav from "./AccountNav";
import BookingsPage from "./BookingsPage";

const AccountPage = () => {
  const navigate = useNavigate();
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  const { user, ready, setUser } = useContext(UserContext);

  if (!ready) {
    return <div>Loading...</div>;
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  const HandleLogout = () => {
    axios.post("/logout").then(() => {
      navigate("/");
      setUser(null);
    });
  };

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className=" max-w-md text-center mx-auto ">
          <div className=" font-bold">
            Logged in as {user.name} ({user.email})
          </div>
          <br />
          <button
            onClick={HandleLogout}
            className=" bg-red-500 text-white rounded-full px-4 py-2"
          >
            logout
          </button>
        </div>
      )}
      {subpage === "places" && (
        <div>
          <PlacePage />
        </div>
      )}
      {subpage === "bookings" && (
        <div>
          <BookingsPage />
        </div>
      )}
    </div>
  );
};

export default AccountPage;
