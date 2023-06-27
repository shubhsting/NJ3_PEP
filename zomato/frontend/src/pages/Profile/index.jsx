import Avatar from "@mui/material/Avatar";
import { Button, TextField } from "@mui/material";
import "./styles.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  let [email, setEmail] = useState();
  let [phone, setPhone] = useState();
  let [firstName, setFirstName] = useState();
  let [lastName, setLastName] = useState();
  let [cookies, setCookies, removeCookie] = useCookies();
  const navigate = useNavigate();
  //localhost:5000/api/user/get
  //{auth_token: null}
  useEffect(() => {
    if (
      Object.keys(cookies).indexOf("auth_token") === -1 ||
      !cookies["auth_token"]
    ) {
      navigate("/login");
    }
    axios
      .get("http://localhost:5000/api/user/get", {
        headers: { auth_token: cookies["auth_token"] },
      })
      .then((response) => {
        setEmail(response.data.user.email);
        setPhone(response.data.user.phone);
        setFirstName(response.data.user.first_name);
        setLastName(response.data.user.last_name);
      })
      .catch((e) => {
        console.log("exception", e);
        navigate("/login")
      });
  }, []);

  function logout() {
    removeCookie("auth_token");
    navigate("/login");
  }

  return (
    <div className="profile-container">
      <Avatar
        alt="Remy Sharp"
        src="http://localhost:5000/images/users/user-1687753951262.jpg"
        sx={{ width: 56, height: 56 }}
      />
      <TextField
        id="filled-basic"
        label={email}
        variant="filled"
        className="input-field"
        disabled
      />
      <TextField
        id="filled-basic"
        label={firstName}
        variant="filled"
        disabled
        className="input-field"
      />
      <TextField
        id="filled-basic"
        label={lastName}
        variant="filled"
        disabled
        className="input-field"
      />
      <TextField
        id="filled-basic"
        label={phone}
        variant="filled"
        disabled
        className="input-field"
      />
      <Button variant="outlined" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
