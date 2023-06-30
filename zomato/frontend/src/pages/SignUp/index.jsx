import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";

import axios from "axios";
import "./styles.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp() {
  let [email, setEmail] = useState();
  let [phone, setPhone] = useState();
  let [firstName, setFirstName] = useState();
  let [lastName, setLastName] = useState();
  let [password, setPassword] = useState();
  let [error, setError] = useState(false);
  let [errorMessage, setErrorMessage] = useState();
  let [listOfLocations, setListOfLocations] = useState([]);
  let [selectedLocationValue, setSelectedLocationValue] = useState();

  function handleClose() {
    setError(false);
  }
  const navigate = useNavigate();
  async function fetchLocations(location) {
    axios
      .get(`http://localhost:5000/api/common/location?location=${location}`)
      .then((response) => {
        setListOfLocations(response.data.data);
      })
      .catch(() => {
        setListOfLocations([]);
      });
  }
  async function signUp() {
    const reqBody = {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      currentAddress: selectedLocationValue.display_name,
      geoCurrentAddress: {
        type: "Point",
        coordinates: [selectedLocationValue.lat, selectedLocationValue.lon],
      },
    };
    axios
      .post("http://localhost:5000/api/user/signup", reqBody)
      .then((response) => {
        if (response.status == 200) {
          console.log("signup successfull", response);
          navigate("/login");
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
        label="Phone"
        variant="filled"
        className="input-field"
        onChange={(event) => {
          setPhone(event.target.value);
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

      <Autocomplete
        options={listOfLocations}
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

      <div className="input-field coordinates-holder">
        <TextField
          id="filled-basic"
          label="Latitude"
          value={selectedLocationValue ? selectedLocationValue?.lat : ""}
          variant="filled"
          disabled
        />
        <TextField
          id="filled-basic"
          label="Longitude"
          variant="filled"
          disabled
          value={selectedLocationValue ? selectedLocationValue?.lon : ""}
        />
      </div>
      <Button variant="outlined" onClick={signUp}>
        Sign up
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
