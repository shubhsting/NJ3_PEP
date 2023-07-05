import React, { useState } from "react";
import "./styles.css";
import { Button, TextField, Autocomplete } from "@mui/material";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function CreateRidePage() {
  let [startLocationList, setStartLocationList] = useState([]);
  let [endLocationList, setEndLocationList] = useState([]);

  let [selectedStartLocation, setSelectedStartLocation] = useState();
  let [selectedEndLocation, setSelectedEndLocation] = useState();

  let [cookies, setCookies] = useCookies();
  const navigate = useNavigate()
  async function fetchLocations(location, identifier) {
    axios
      .get(
        `http://localhost:5000/api/common/get-coordinates?location=${location}`
      )
      .then((response) => {
        if (identifier == "start") {
          setStartLocationList(response.data.data);
        } else {
          setEndLocationList(response.data.data);
        }

        console.log(response);
      })
      .catch((e) => {
        if (identifier == "start") {
          setStartLocationList([]);
        } else {
          setEndLocationList([]);
        }
      });
  }

  async function createRide() {
    axios({
      method: "post",
      url: "http://localhost:5000/api/ride/create",
      headers: {
        auth_token: cookies["auth_token"],
      },
      data: {
        startLocation: {
          type: "Point",
          coordinates: [selectedStartLocation.lat, selectedStartLocation.lon],
        },
        endLocation: {
          type: "Point",
          coordinates: [selectedEndLocation.lat, selectedEndLocation.lon],
        },
        start: selectedStartLocation.display_name,
        end: selectedEndLocation.display_name,
      },
    }).then((response) => {
      navigate(`/${response.data.data._id}/overview`)
      console.log(response);
    });
  }
  return (
    <div className="ride-create-container">
      <h2>Create Ride</h2>

      <Autocomplete
        options={startLocationList}
        getOptionLabel={(option) => option.display_name}
        id="disable-close-on-select"
        clearOnEscape
        className="input-field"
        onInput={(event) => {
          fetchLocations(event.target.value, "start");
        }}
        onChange={(event, value) => {
          setSelectedStartLocation(value);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Start Location" variant="standard" />
        )}
      />

      <Autocomplete
        options={endLocationList}
        getOptionLabel={(option) => option.display_name}
        id="disable-close-on-select"
        clearOnEscape
        className="input-field"
        onInput={(event) => {
          fetchLocations(event.target.value, "end");
        }}
        onChange={(event, value) => {
          setSelectedEndLocation(value);
        }}
        renderInput={(params) => (
          <TextField {...params} label="End Location" variant="standard" />
        )}
      />

      <Button variant="outlined" onClick={createRide}>
        Create Ride
      </Button>
    </div>
  );
}
