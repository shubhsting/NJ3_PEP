import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import ChatPage from "./pages/ChatPage";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/chat" element={<ChatPage />}></Route>
      </Routes>
    </BrowserRouter>
  </CookiesProvider>
);

// we use 2 type of loops

// forEach
// map
