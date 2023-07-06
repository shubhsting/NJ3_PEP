import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { TextField, Autocomplete } from "@mui/material";

import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function ListRides(params) {
  let [cookies, setCookies] = useCookies();
  let [ridesList, setRidesList] = useState([]);

  let [estimatedArrivalTime, setEstimatedArrivalTime] = useState();
  const navigate = useNavigate();

  async function acceptRide(rideId) {
    axios({
      method: "post",
      url: "http://localhost:5000/api/ride/change-status",
      headers: {
        auth_token: cookies["auth_token"],
      },
      data: {
        estimatedArrivalTime,
        rideId,
        status: "ACCEPTED_BY_DRIVER_ON_HIS_WAY"
      },
    }).then((response) => {
      navigate(`/${rideId}/overview`);
    });
  }
  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/user/fetch-rides",
      headers: {
        auth_token: cookies["auth_token"],
      },
    }).then((response) => {
      setRidesList(response.data.data);
      console.log(response.data);
    });
  }, []);
  return (
    <div>
      {ridesList.map((ride, index) => {
        return (
          <Card variant="outlined" key={index}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              ></Typography>
              <Typography variant="h5" component="div">
                Destination: {ride.end}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Pickup: {ride.start}
              </Typography>
              <Typography variant="body2">
                Total Distance: {ride.distanceInKm}
              </Typography>

              <TextField
                id="filled-basic"
                label={"Enter your estimated arrival time(in mins) at pickup"}
                variant="filled"
                className="input-field"
                onChange={(event) => {
                  setEstimatedArrivalTime(event.target.value);
                }}
              />
              <Button onClick={()=>{
                acceptRide(ride._id)
              }}> Accept Ride</Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
