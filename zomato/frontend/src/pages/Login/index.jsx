import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import "./styles.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [error, setError] = useState(false);
  let [errorMessage, setErrorMessage] = useState();


  const navigate = useNavigate();
  function handleClose() {
    setError(false);
  }

  async function login() {
    axios
      .post("http://localhost:5000/api/user/login", { email, password })
      .then((response) => {
        if (response.status == 200) {
          console.log("login successful!!!");
          navigate("/profile");
        } else {
          setError(true);
          setErrorMessage(response.data.message);
        }
      })
      .catch((e) => {
        setError(true);
        setErrorMessage(e.response.data.message);
      });
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
      <Button variant="outlined" onClick={login}>
        Login
      </Button>

      {error && (
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}
