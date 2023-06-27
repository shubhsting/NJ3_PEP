import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./pages/Login/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp/index";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="" element={<ErrorPage />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
    </Routes>
  </BrowserRouter>
);

// we use 2 type of loops

// forEach
// map
