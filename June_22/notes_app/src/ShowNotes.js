import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function ShowNotes() {
  let [notes, updateNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/fetch/all-notes").then((response) => {
      updateNotes(response.data.notes);
      console.log(response.data.notes);
    });
  }, []);

  return (
    <div className="show-notes">
      {notes.map((note, index) => {
        return <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{note.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{note.description}</Typography>
          </AccordionDetails>
        </Accordion>;
      })}
    </div>
  );
}
