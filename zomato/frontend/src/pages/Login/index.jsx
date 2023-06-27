import React from "react";
import { Button, TextField } from "@mui/material";
import "./styles.css"

export default function Login() {
  return (
    <div className="login-container">
        <h2>LOGIN</h2>
      <TextField id="filled-basic" label="Email" variant="filled" className="input-field"/>
      <TextField
        id="filled-password-input"
        label="Password"
        type="password"
        className="input-field"
        variant="filled"
      />
      <Button variant="outlined">Login</Button>
    </div>
  );
}
