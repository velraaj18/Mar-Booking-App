import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import axios from "axios";
import UserContextProvider from "../UserContext";
import AccountPage from "./Pages/AccountPage";
import PlaceForm from "./Pages/PlaceForm";
import SinglePlacePage from "./Pages/SinglePlacePage";
import SingleBookingPage from "./Pages/SingleBookingPage";

axios.defaults.baseURL = "https://mar-booking-api.vercel.app";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/accounts/:subpage?" element={<AccountPage />} />
            <Route
              path="/accounts/:subpage/:action?"
              element={<AccountPage />}
            />
            <Route path="/accounts/place/:id" element={<PlaceForm />} />
            <Route path="/place/:id" element={<SinglePlacePage />} />
            <Route
              path="/accounts/bookings/:id"
              element={<SingleBookingPage />}
            />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
};

export default App;
