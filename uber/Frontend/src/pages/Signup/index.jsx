import React, { useState } from "react";
import { Button, TextField, Autocomplete } from "@mui/material";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  let [email, setEmail] = useState();
  let [firstName, setFirstName] = useState();
  let [lastName, setLastName] = useState();
  let [password, setPassword] = useState();
  let [optionsList, setoptionsList] = useState([]);
  let [selectedLocationValue, setSelectedLocationValue] = useState();
  const navigate = useNavigate();

  async function fetchLocations(location) {
    axios
      .get(
        `http://localhost:5000/api/common/get-coordinates?location=${location}`
      )
      .then((response) => {
        setoptionsList(response.data.data);
        console.log(response);
      })
      .catch((e) => {
        setoptionsList([]);
      });
  }

  async function signup() {
    axios
      .post("http://localhost:5000/api/user/signup", {
        email,
        password,
        firstName,
        lastName,
        currentLocation: {
          type: "Point",
          coordinates: [selectedLocationValue.lat, selectedLocationValue.lon],
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/login")
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
      <Autocomplete
        options={optionsList}
        getOptionLabel={(option) => option.display_name}
        id="disable-close-on-select"
        clearOnEscape
        className="input-field"
        onInput={(event) => {
          fetchLocations(event.target.value);
        }}
        onChange={(event, value) => {
          setSelectedLocationValue(value);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Address" variant="standard" />
        )}
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
