import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";


export default function FetchRideDetailsPage(req, res) {
  const params = useParams();
  let [cookies, setCookies] = useCookies();
    useEffect(()=>{
        axios({
            method: "post",
            url: "http://localhost:5000/api/ride/getById",
            headers: {
                auth_token: cookies["auth_token"]
            },
            data: {
                rideId: params.rideId
            }
        }).then((response)=>{
            console.log(response.data)
        })
    }, [])
  
  return <div>
    
    This is ride page
    </div>;
}
