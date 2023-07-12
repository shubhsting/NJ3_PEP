import React, { useEffect, useState } from "react";
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

  let [userCurrentLocationCoordinates, setUserCurrentLocationCoordinates] =
    useState();
  let [userCurrentLocation, setUserCurrentLocation] = useState();

  let [cookies, setCookies] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("location not found");
    }
  }, []);

  async function fetchLocations(location, identifier) {
    axios
      .get(
        `https://uber-backend-test.onrender.com/api/common/get-coordinates?location=${location}`
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

  useEffect(() => {
    if (userCurrentLocationCoordinates) {
      axios({
        method: "post",
        url: "https://uber-backend-test.onrender.com/api/common/get-address",
        data: {
          latitude: userCurrentLocationCoordinates.coords.latitude,
          longitude: userCurrentLocationCoordinates.coords.longitude,
        },
      }).then((response) => {
        console.log(response.data.data);
        setUserCurrentLocation(response.data.data);
      });
    }
  }, [userCurrentLocationCoordinates]);

  // latitude, longitude -> string address -> reverse geocoding
  // geocoding string address , coordinates
  function success(location) {
    console.log(location);
    setUserCurrentLocationCoordinates(location);
  }

  function fetchStartValue() {
    if (selectedStartLocation) {
      return selectedStartLocation;
    } else if (!selectedStartLocation && userCurrentLocation) {
      return userCurrentLocation;
    }
    return null;
  }
  function error() {
    console.log("error occurred");
  }
  async function createRide(startLocation) {
    axios({
      method: "post",
      url: "https://uber-backend-test.onrender.com/api/ride/create",
      headers: {
        auth_token: cookies["auth_token"],
      },
      data: {
        startLocation: {
          type: "Point",
          coordinates: [startLocation.lat, startLocation.lon],
        },
        endLocation: {
          type: "Point",
          coordinates: [selectedEndLocation.lat, selectedEndLocation.lon],
        },
        start: startLocation.display_name,
        end: selectedEndLocation.display_name,
      },
    }).then((response) => {
      navigate(`/${response.data.data._id}/overview`);
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
        value={fetchStartValue()}
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

      <Button
        variant="outlined"
        onClick={() => {
          createRide(
            selectedStartLocation ? selectedStartLocation : userCurrentLocation
          );
        }}
      >
        Create Ride
      </Button>
    </div>
  );
}
