import { Button, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function CreateRestaurant() {
  let [listOfLocations, setListOfLocations] = useState([]);
  let [selectedLocationValue, setSelectedLocationValue] = useState();
  let [name, setName] = useState();
  let [contactNumber, setContactNumber] = useState();
  let [landline, setLandline] = useState();
  let [ownerPhone, setOwnerPhone] = useState();
  let [ownerName, setOwnerName] = useState();
  let [ownerEmail, setOwnerEmail] = useState();
  let [cookies, setCookies, removeCookie] = useCookies();
  
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

  async function createRestaurant() {
    axios({
      method: "post",
      url:"http://localhost:5000/api/restaurant/register",
      headers: {
        auth_token: cookies["auth_token"],
      },
      data: {
        name,
        completeAddress: selectedLocationValue.display_name,
        geoCompleteAddress: {
          type: "Point",
          coordinates: [selectedLocationValue?.lat, selectedLocationValue?.lon],
        },
        contact_no: contactNumber,
        landline,
        owner_name: ownerName,
        owner_phone: ownerPhone,
        owner_email: ownerEmail,
      },
    }).then((response)=>{
        console.log(response.data)
    })
  }

  return (
    <div className="signup-container">
      <h2>CREATE RESTAURANT</h2>
      <TextField
        id="filled-basic"
        label="Restaurant name"
        variant="filled"
        className="input-field"
        onChange={(event) => {
          setName(event.target.value);
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

      <TextField
        id="filled-basic"
        label="Contact number"
        variant="filled"
        className="input-field"
        onChange={(event) => {
          setContactNumber(event.target.value);
        }}
      />
      <TextField
        id="filled-basic"
        label="landline"
        variant="filled"
        className="input-field"
        onChange={(event) => {
          setLandline(event.target.value);
        }}
      />

      <TextField
        id="filled-basic"
        label="Owner name"
        variant="filled"
        className="input-field"
        onChange={(event) => {
          setOwnerName(event.target.value);
        }}
      />

      <TextField
        id="filled-basic"
        label="owner phone number"
        variant="filled"
        className="input-field"
        onChange={(event) => {
          setOwnerPhone(event.target.value);
        }}
      />

      <TextField
        id="filled-basic"
        label="Owner email"
        variant="filled"
        className="input-field"
        onChange={(event) => {
          setOwnerEmail(event.target.value);
        }}
      />

      <Button
        variant="outlined"
        onClick={() => {
            createRestaurant()
        }}
      >
        Create restaurant
      </Button>
    </div>
  );
}
