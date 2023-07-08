import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Button, TextField } from "@mui/material";

import "./styles.css"

export default function ChatPage() {
  const navigate = useNavigate();
  let [cookies, setCookies] = useCookies();

  //   const socket = io.connect("http://localhost:5000", {
  //     autoConnect: false,
  //   });

  useEffect(() => {
    if (!cookies["auth_token"]) {
      navigate("/login");
    }
  }, []);

  //   useEffect(() => {
  //     const socket = io.connect("http://localhost:5000", {
  //       query: "token=" + cookies["auth_token"],
  //     });
  //     socket.on("new_user_joined", (response) => {
  //       console.log(response.message);
  //     });
  //     return () => {
  //       socket.off("new_user_joined", (response) => {
  //         console.log(response.message);
  //       });
  //       io.disconnect("http://localhost:5000");
  //     };
  //   }, []);

  return (
    <div className="chat-container">
      <div className="chat-box">


        <div className="footer">

        <TextField
        id="filled-basic"
        label="Type message"
        variant="filled"
        className="input-field"
        onChange={(event) => {
          
        }}
      />
      <Button variant="outlined">
        Send Message
      </Button>
        </div>
      </div>
    </div>
  );
}
