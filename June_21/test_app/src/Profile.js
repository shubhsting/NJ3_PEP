import React from "react";

// function Test() {
//   return <h1>this is heading</h1>;
// }

export default function Profile({name="default name"}) {
  return (
    <React.Fragment>
      <h1>{name}</h1>
      <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />
        
      {(name === "Shubham" || name === "Naman") && <h3>This is additional section for shubham and naman</h3>}
    </React.Fragment>
  );
}
