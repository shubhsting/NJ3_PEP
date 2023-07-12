import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Button, TextField } from "@mui/material";

import "./styles.css";

function RenderListElements({ messages }) {
  const messagesComponent = [];
  messages.map((message, index) => {
    if (message.type === "NEW_USER_JOINED") {
      messagesComponent.push(
        <div className="new-user-joined-message" key={index}>
          {" "}
          {message.content}
        </div>
      );
    } else if (message.type === "SOME_USER_MESSAGED") {
      messagesComponent.push(
        <div className="some-user-messaged" key={index}>
          {message.owner} <br />
          {message.content}
        </div>
      );
    } else if(message.type === "MY_SENT_MESSAGE") {
      messagesComponent.push(
        <div className="i-messaged" key={index}>
          {message.owner} <br />
          {message.content}
        </div>
      );
    }
  });
  return messagesComponent;
}
export default function ChatPage() {
  const navigate = useNavigate();
  let [cookies, setCookies] = useCookies();
  let [showMessagesList, setShowMessagesList] = useState([]);
  let [typingMessage, setTypingMessage] = useState();
  let [socket, setSocket] = useState();

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify([]));
    if (!cookies["auth_token"]) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const socket = io.connect("https://chat-app-shubham-test.onrender.com", {
      query: "token=" + cookies["auth_token"],
    });
    setSocket(socket);
    socket.on("new_user_joined", (response) => {
      addMessageAndUpdateState({
        type: "NEW_USER_JOINED",
        content: response.message,
      });
    });

    socket.on("new_message_sent_by_someone", (response) => {
      addMessageAndUpdateState({
        type: "SOME_USER_MESSAGED",
        content: response.message,
        owner: `${response.owner.firstName} ${response.owner.lastName}`,
      });
    });
    return () => {
      socket.off("new_user_joined", (response) => {
        addMessageAndUpdateState({
          type: "NEW_USER_JOINED",
          content: response.message,
        });
      });

      io.disconnect("https://chat-app-shubham-test.onrender.com");
    };
  }, []);

  async function addMessageAndUpdateState(message) {
    let messages = localStorage.getItem("messages");
    if (messages) {
      messages = JSON.parse(messages);
    } else {
      messages = [];
    }
    messages.push(message);
    localStorage.setItem("messages", JSON.stringify(messages));
    setShowMessagesList(messages);
  }

  async function sendMessage() {
    socket.emit("user_message", {
      message: typingMessage,
      auth_token: cookies["auth_token"],
    });
    addMessageAndUpdateState({
      type: "MY_SENT_MESSAGE",
      content: typingMessage,
      owner: "You",
    });
    setTypingMessage("");
  }
  return (
    <div className="chat-container">
      <div className="chat-box">
        {<RenderListElements messages={showMessagesList} />}
        <div className="footer">
          <TextField
            id="filled-basic"
            label="Type message"
            variant="filled"
            className="input-field"
            value={typingMessage}
            onChange={(event) => {
              setTypingMessage(event.target.value);
            }}
          />
          <Button variant="outlined" onClick={sendMessage}>
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
}
