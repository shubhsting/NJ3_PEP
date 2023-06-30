import Avatar from "@mui/material/Avatar";
import { Button, TextField } from "@mui/material";
import "./styles.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");

  let [address, setAddress] = useState("");
  let [firstName, setFirstName] = useState("");
  let [profileImage, setProfileImage] = useState();
  let [lastName, setLastName] = useState("");
  let [cookies, setCookies, removeCookie] = useCookies();
  let [profilePicture, setProfilePicture] = useState();

  const navigate = useNavigate();

  async function uploadProfileImage() {
    if (!profilePicture) {
      console.log("no profile picture found!!!!");
      return;
    }
    const form = new FormData();
    form.append("image", profilePicture);

    axios({
      method: "post",
      url: "http://localhost:5000/api/user/upload-profile-picture",
      data: form,
      headers: {
        auth_token: cookies["auth_token"],
      },
    }).then((response) => {
      console.log(response.data);
    });
  }
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
        console.log(response.data);
        setEmail(response.data.user.email);
        setPhone(response.data.user.phone);
        setFirstName(response.data.user.first_name);
        setLastName(response.data.user.last_name);
        setAddress(response.data.user.currentAddress);
        setProfileImage(response.data.user.profile_image);

      })
      .catch((e) => {
        console.log("exception", e);
        navigate("/login");
      });
  }, []);

  function logout() {
    removeCookie("auth_token");
    navigate("/login");
  }

  return (
    <div className="profile-container">
      <div>
        <Avatar
          alt="Remy Sharp"
          src={
            profileImage ? `http://localhost:5000/${profileImage}` : undefined
          }
          sx={{ width: 56, height: 56 }}
        />
        <input
          type="file"
          onChange={(event) => {
            setProfilePicture(event.target.files[0]);
          }}
        />
      </div>

      <TextField
        id="filled-basic"
        label={"Email"}
        value={email}
        variant="filled"
        className="input-field"
        disabled
      />
      <TextField
        id="filled-basic"
        label={"First Name"}
        value={firstName}
        variant="filled"
        disabled
        className="input-field"
      />
      <TextField
        id="filled-basic"
        label={"Last Name"}
        value={lastName}
        variant="filled"
        disabled
        className="input-field"
      />
      <TextField
        id="filled-basic"
        label={"Phone Number"}
        value={phone}
        variant="filled"
        disabled
        className="input-field"
      />
      <TextField
        id="filled-basic"
        label={"Address"}
        value={address}
        variant="filled"
        disabled
        className="input-field"
      />
      <Button variant="outlined" onClick={logout}>
        Logout
      </Button>
      <Button variant="outlined" onClick={uploadProfileImage}>
        Update
      </Button>
    </div>
  );
}
