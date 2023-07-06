import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";

import { CookiesProvider } from "react-cookie";
import Signup from "./pages/Signup/index";
import Login from "./pages/Login/index";
import CreateRidePage from "./pages/CreateRidePage/index";
import FetchRideDetailsPage from "./pages/FetchRideDetailsPage";
import ListRides from "./pages/ListRides/index";



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<CreateRidePage />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/rides-near-me" element={<ListRides />}></Route>
        <Route path="/:rideId/overview" element={<FetchRideDetailsPage />}></Route>
      </Routes>
    </BrowserRouter>
  </CookiesProvider>
);

// we use 2 type of loops

// forEach
// map
