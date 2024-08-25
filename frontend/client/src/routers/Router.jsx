import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import UserSettingPage from "../pages/UserSettingPage";
import UserOrder from "../pages/UserOrder";
import UserProfile from "../pages/UserProfile";
import ItemsDetailsPage from "../pages/ItemsDetailsPage";
import RecipesPage from "../pages/RecipesPage";
import SuccessPage from "../pages/SuccessPage";
import CanclePage from "../pages/CanclePage";
import RestaurantDetailsPage from "../pages/RestaurantDetailsPage";
import SearchPage from "../pages/SearchPage";
import ContactUsPage from "../pages/ContactUsPage";
import AboutUsPage from "../pages/AboutUsPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignupPage />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/recipe/:category" element={<RecipesPage />} />
      <Route path="/:name/:id" element={<ItemsDetailsPage />} />
      <Route path="/payment-success" element={<SuccessPage />} />
      <Route path="/payment-cancle" element={<CanclePage />} />
      <Route path="/restaurant/:name/:id" element={<RestaurantDetailsPage />} />
      <Route path='/search' element={<SearchPage/>}/>
      <Route path='/contact-us' element={<ContactUsPage/>}/>
      <Route path='/about-us' element={<AboutUsPage/>}/>

      <Route path="/user/*" element={<UserSettingPage/>}>
        <Route path="profile" element={<UserProfile />} />
        <Route path="my-order" element={<UserOrder />} />
      </Route>
    </Routes>
  );
};

export default Router;
