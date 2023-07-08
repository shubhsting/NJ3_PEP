import React from "react";
import { Button, TextField } from "@mui/material";
import "./styles.css"
import { useState } from "react";
import axios from "axios";


export default function Login() {
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();


  async function login() {
    axios({
        method: "post",
        url: "http://localhost:5000/login",
        data: {
            email, password
        }
    }).then((response)=>{
        console.log(response)
    })
  }
  return (
    <div className="login-container">
      <h2>LOGIN</h2>
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
        id="filled-password-input"
        label="Password"
        type="password"
        className="input-field"
        variant="filled"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <Button variant="outlined" onClick={login}>Log in</Button>
    </div>
  );
}
