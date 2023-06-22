import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Button from "@mui/base/Button";
import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';


export default function CreateNoteInput() {
  let [title, changeTitle] = useState(""); //hook
  let [description, changeDescription] = useState("");
  let [message, updateMessage] = useState(undefined)

//   useEffect(() => {
//     console.log("use effect triggered");
//   }, []);


// axios -> used to trigger api
 async function createNote() {
    const createNoteResponse = await axios.post("http://localhost:5000/notes/create", {title: title, description: description})
    updateMessage(createNoteResponse.data.message)
    console.log(createNoteResponse.data)
 }


  return (
    <div className="create-note">
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        onChange={(event) => {
          changeTitle(event.target.value);
        }}
      />
      <TextareaAutosize
        onChange={(event) => {
          changeDescription(event.target.value);
        }}
      />
      {message && <div>{message}</div>}
      <Button
        onClick={() => {
          createNote()
        }}
      >
        Create Note
      </Button>
      ;
    </div>
  );
}
