import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

export default function Login() {
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [cookies, setCookies] = useCookies();
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function login() {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/user/login", { email, password })
      .then((response) => {
        console.log(response);
        setCookies("auth_token", response.data.token);
        navigate("/");
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }
  return (
    <div className="signup-container">
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
      {!loading && (
        <Button variant="outlined" onClick={login}>
          Log in
        </Button>
      )}
      {loading && (
        <LoadingButton loading variant="outlined">
          Log in
        </LoadingButton>
      )}
    </div>
  );
}
