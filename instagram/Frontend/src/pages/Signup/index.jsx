import React, { useState } from "react";
import { Button, TextField, Autocomplete } from "@mui/material";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from '@mui/lab';

export default function Signup() {
  let [email, setEmail] = useState();
  let [firstName, setFirstName] = useState();
  let [lastName, setLastName] = useState();
  let [password, setPassword] = useState();
  let [userName, setUserName] = useState();
  let [loading, setLoading] = useState(false);
  let [phone, setPhone] = useState();
  const navigate = useNavigate();

  async function signup() {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/user/signup", {
        email,
        password,
        firstName,
        lastName,
        phone,
        userName,
      })
      .then((response) => {
        navigate("/login");
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
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
        id="filled-basic"
        label="Phone Number"
        variant="filled"
        className="input-field"
        onChange={(event) => {
          setPhone(event.target.value);
        }}
      />

      <TextField
        id="filled-basic"
        label="Username"
        variant="filled"
        className="input-field"
        onChange={(event) => {
          setUserName(event.target.value);
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
        <Button variant="outlined" onClick={signup}>
          Sign up
        </Button>
      )}

      {loading && (
        <LoadingButton loading variant="outlined">
          Sign up
        </LoadingButton>
      )}
    </div>
  );
}
