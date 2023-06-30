import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./pages/Login/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile/index";
import SignUp from "./pages/SignUp/index";
import { CookiesProvider } from "react-cookie";
import NearByRestaurants from "./pages/NearbyRestaurants";
import CreateRestaurant from "./pages/CreateRestaurant";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="" element={<ErrorPage />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/restaurants" element={<NearByRestaurants />}></Route>
        <Route path="/create-restaurant" element={<CreateRestaurant />}></Route>
      </Routes>
    </BrowserRouter>
  </CookiesProvider>
);

// we use 2 type of loops

// forEach
// map
