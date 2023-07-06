import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, TextField, Autocomplete, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import Rating from "@mui/material/Rating";
import "./styles.css";

export default function FetchRideDetailsPage(req, res) {
  let [isDriver, setIsDriver] = useState();
  let [rideDetails, setRideDetails] = useState();
  let [driverDetails, setdriverDetails] = useState();
  let [rating, setRating] = useState();

  function getMessageFromStatus(status) {
    console.log("this is status", status);
    if (status === "ACCEPTED_BY_DRIVER_ON_HIS_WAY") {
      return `${driverDetails.firstName} ${driverDetails.lastName} is on his way to pick you up and is reaching in ${rideDetails.estimatedArrivalTime} minutes`;
    } else if (status === "REACHED_LOCATION") {
      return `${driverDetails.firstName} ${driverDetails.lastName} have reached your location`;
    } else if (status === "STARTED") {
      return `${driverDetails.firstName} ${driverDetails.lastName} have picked you up and your ride have started!`;
    } else if (status === "CREATED") {
      return `Locating drivers near you!!`;
    } else {
      return `Your ride was completed successfully`;
    }
  }
  const params = useParams();
  let [cookies, setCookies] = useCookies();
  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/ride/getById",
      headers: {
        auth_token: cookies["auth_token"],
      },
      data: {
        rideId: params.rideId,
      },
    })
      .then((response) => {
        console.log(response.data);
        setRideDetails(response.data.data);
        setdriverDetails(response.data.driverDetails);
        setIsDriver(response.data.isDriver);
      })
      .catch((e) => {
        setdriverDetails(undefined);
        setRideDetails(undefined);
        setIsDriver(false);
      });
  }, []);

  async function submitRating() {
    console.log("entered in submit rating");
    axios({
      method: "post",
      url: "http://localhost:5000/api/ride/rate",
      headers: {
        auth_token: cookies["auth_token"],
      },
      data: {
        rideId: params.rideId,
        rating,
      },
    }).then((response) => {
      console.log(response);
    });
  }
  async function driverReachedPickup() {
    axios({
      method: "post",
      url: "http://localhost:5000/api/ride/change-status",
      headers: {
        auth_token: cookies["auth_token"],
      },
      data: {
        rideId: params.rideId,
        status: "REACHED_LOCATION",
      },
    }).then((response) => {
      console.log("driver reached");
    });
  }

  async function rideStarted() {
    axios({
      method: "post",
      url: "http://localhost:5000/api/ride/change-status",
      headers: {
        auth_token: cookies["auth_token"],
      },
      data: {
        rideId: params.rideId,
        status: "STARTED",
      },
    }).then((response) => {
      console.log("driver started ride");
    });
  }

  async function completeRide() {
    axios({
      method: "post",
      url: "http://localhost:5000/api/ride/change-status",
      headers: {
        auth_token: cookies["auth_token"],
      },
      data: {
        rideId: params.rideId,
        status: "ENDED",
      },
    }).then((response) => {
      console.log("ride completed");
    });
  }
  return (
    <div className="ride-container">
      {rideDetails && (
        <div className="ride-container-2">
          <h2>Ride Details</h2>
          <TextField
            id="filled-basic"
            label={"Start Location"}
            value={rideDetails.start}
            variant="filled"
            disabled
            className="input-field"
          />

          <TextField
            id="filled-basic"
            label={"End Location"}
            value={rideDetails.end}
            variant="filled"
            disabled
            className="input-field"
          />
          <TextField
            id="filled-basic"
            label={"Estimated Time (mins)"}
            value={rideDetails.estimatedTravelTime}
            variant="filled"
            disabled
            className="input-field"
          />

          <TextField
            id="filled-basic"
            label={"Estimated Fare"}
            value={rideDetails.estimatedFare}
            variant="filled"
            disabled
            className="input-field"
          />

          <TextField
            id="filled-basic"
            label={"Total Distance (kms)"}
            value={rideDetails.distanceInKm}
            variant="filled"
            disabled
            className="input-field"
          />
          {!isDriver && (
            <TextField
              id="filled-basic"
              label={"Ride Status"}
              value={getMessageFromStatus(rideDetails.status)}
              variant="filled"
              disabled
              className="input-field"
            />
          )}
          {isDriver &&
            rideDetails.status === "ACCEPTED_BY_DRIVER_ON_HIS_WAY" && (
              <Button onClick={driverReachedPickup}> Reached Pickup</Button>
            )}
          {isDriver && rideDetails.status === "REACHED_LOCATION" && (
            <Button onClick={rideStarted}> Start Ride</Button>
          )}
          {isDriver && rideDetails.status === "STARTED" && (
            <Button onClick={completeRide}> Complete Ride</Button>
          )}

          {isDriver && rideDetails.status === "ENDED" && (
            <div className="rating-holder">
              {!rideDetails.customerRating ? (
                <Typography component="legend">Rate Customer</Typography>
              ) : (
                <Typography component="legend">
                  You already have rated customer with{" "}
                  {rideDetails.customerRating} stars{" "}
                </Typography>
              )}
              <Rating
                name="simple-controlled"
                value={
                  rideDetails.customerRating ? rideDetails.customerRating : rating
                }
                disabled={rideDetails.customerRating ? true : false}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
              {!rideDetails.customerRating && (
                <Button onClick={submitRating}> Submit Rating</Button>
              )}
            </div>
          )}

          {!isDriver && rideDetails.status === "ENDED" && (
            <div className="rating-holder">
              {!rideDetails.driverRating ? (
                <Typography component="legend">Rate Driver</Typography>
              ) : (
                <Typography component="legend">
                  You already rated the driver with {rideDetails.driverRating}{" "}
                  stars
                </Typography>
              )}
              <Rating
                name="simple-controlled"
                value={
                  rideDetails.driverRating ? rideDetails.driverRating : rating
                }
                disabled={rideDetails.driverRating ? true : false}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
              {!rideDetails.driverRating && (
                <Button onClick={submitRating}> Submit Rating</Button>
              )}
            </div>
          )}
        </div>
      )}
      {!rideDetails && <>Invalid ride id passed</>}
    </div>
  );
}
