import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import UserSettingPage from "../pages/UserSettingPage";
import UserOrder from "../pages/UserOrder";
import UserProfile from "../pages/UserProfile";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignupPage />} />

      <Route path="/user/*" element={<UserSettingPage/>}>
        <Route path="profile" element={<UserProfile />} />
        <Route path="my-order" element={<UserOrder />} />
      </Route>
    </Routes>
  );
};

export default Router;
