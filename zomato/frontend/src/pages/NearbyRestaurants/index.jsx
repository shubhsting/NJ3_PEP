import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function NearByRestaurants() {
  let [cookies, setCookies, removeCookie] = useCookies();
  let [currentLongitude, setCurrentLongitude] = useState();
  let [currentLatitude, setCurrentLatitude] = useState();
  let [restaurantsList, setRestaurantsList] = useState([]);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, failure);
  } else {
    console.log("geolocation not supported");
  }
  const navigate = useNavigate();
  function success(position) {
    console.log("position detected", position);
    setCurrentLatitude(position.coords.latitude);
    setCurrentLongitude(position.coords.longitude);
  }
  function failure() {
    console.log("unable to get location!!");
  }

  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/user/nearby-restaurants",
      headers: {
        auth_token: cookies["auth_token"],
      },
      data: {
        latitude: currentLatitude,
        longitude: currentLongitude,
      },
    }).then((response) => {
      setRestaurantsList(response.data.restaurants);
    });
  }, [currentLongitude, currentLatitude]);

  return (
    <>
      {restaurantsList.map((restaurant, index) => {
        return (
          <Card variant="outlined" key={index}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                
              </Typography>
              <Typography variant="h5" component="div">
                {restaurant.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {restaurant.popularDishes}
              </Typography>
              <Typography variant="body2">
                {restaurant.completeAddress}
              </Typography>
              <Button onClick={()=>{
                navigate(`/${restaurant.slug}/open`)
              }}> Open restaurant</Button>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
