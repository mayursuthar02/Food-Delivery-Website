import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import RestaurantProfile from "../pages/RestaurantProfile";
import DasboardPage from "../pages/DasboardPage";
import RestaurantMenuPage from "../pages/RestaurantMenuPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/dashboard/*" element={<DasboardPage/>}>
        <Route path="profile" element={<RestaurantProfile />} />
        <Route path="menu-items" element={<RestaurantMenuPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
