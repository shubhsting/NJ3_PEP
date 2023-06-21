import React, { useState } from "react";
import Profile from "./Profile";
// import Button from '@mui/material/Button';
const people = ["Shubham", "Naman", "Test Name", "Dheeraj"];

function App() {
  let [showPhotos, updateShowPhotos] = useState(false); //hook
  // return fxn
  return (
    <React.Fragment>
      <button
        onClick={() => {
          updateShowPhotos(true);
        }}
      >
        I don't do anything
      </button>

      {showPhotos &&
        people.map((person, index) => {
          return <Profile name={person} key={index}/>;
        })}
    </React.Fragment>
  );
}

export default App;

// class App extends React.Component {

//   constructor() {

//   }

//   render() {
//     return (
//     <div className="App">
//      hello from shubham
//     </div>
//   );
//   }
// }

// export default App

// component -> collection of tags, code etc which is rendered/shown on screen
// state -> every component have a state

// functional component
// class component
