import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Signup from "./pages/Signup/index";
import Login from "./pages/Login/index";
import PostPage from "./pages/PostPage";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/" element={<PostPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  </CookiesProvider>
);

// we use 2 type of loops

// forEach
// map
