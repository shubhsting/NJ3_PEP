import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Profile from "./Profile";
const people = ["Shubham", "Naman", "Test Name", "Dheeraj"];
const root = ReactDOM.createRoot(document.getElementById("root"));

function handleClick() {
  console.log("button clicked")
}
root.render(
  <React.StrictMode>
    {/* <button onClick={handleClick}>I don't do anything</button>

    {people.map((people) => {
      return <Profile name={people} />;
    })} */}


    <App/>
  </React.StrictMode>
);

// we use 2 type of loops

// forEach
// map
