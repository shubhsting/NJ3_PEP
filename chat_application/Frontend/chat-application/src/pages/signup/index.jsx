import React from "react";
import { Button, TextField } from "@mui/material";
import "./styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function Signup() {
  let [email, setEmail] = useState();
  let [firstName, setFirstName] = useState();
  let [lastName, setLastName] = useState();
  let [password, setPassword] = useState();
  const navigate = useNavigate();

  async function signup() {
    axios({
      method: "post",
      url: "https://chat-app-shubham-test.onrender.com/signup",
      data: {
        email,
        password,
        firstName,
        lastName,
      },
    }).then((response) => {
      console.log("signup successful", response.data);
      navigate("/login");
    });
  }
  return (
    <div className="signup-container">
      <h2>SIGN UP</h2>
      <TextField
        id="filled-basic"
        label="Email"
        variant="filled"
        className="input-field"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <TextField
        id="filled-basic"
        label="First Name"
        variant="filled"
        className="input-field"
        onChange={(event) => {
          setFirstName(event.target.value);
        }}
      />
      <TextField
        id="filled-basic"
        label="Last Name"
        variant="filled"
        className="input-field"
        onChange={(event) => {
          setLastName(event.target.value);
        }}
      />
      <TextField
        id="filled-password-input"
        label="Password"
        type="password"
        className="input-field"
        variant="filled"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <Button variant="outlined" onClick={signup}>
        Sign up
      </Button>
    </div>
  );
}
