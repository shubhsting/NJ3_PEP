import axios from "axios"
import { useState } from "react";
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function RestaurantDetail() {
    const [restaurant, setRestaurant] = useState();
    const params = useParams();
    
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/restaurant/${params.restaurantSlug}/fetch`).then((response)=>{
            console.log(response)
            setRestaurant(response.data.data)
        })
    }, [])


    return <>
    
    {restaurant &&  <Card variant="outlined">
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
            </CardContent>
          </Card>}
    </>
}