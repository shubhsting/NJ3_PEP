import React from "react";
import ReactDOM from "react-dom/client";
import CreateNoteInput from "./CreateNote";
import ShowNotes from "./ShowNotes";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* <button onClick={handleClick}>I don't do anything</button>

    {people.map((people) => {
      return <Profile name={people} />;
    })} */}

    <div className="notes-bar">
      <CreateNoteInput />
      <ShowNotes />
    </div>
  </React.StrictMode>
);

// we use 2 type of loops

// forEach
// map
