import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  let [isDataLoading, setIsDataLoading] = useState(true);
  let [totalCount, setTotalEntriesCount] = useState();
  let [entries, setEntries] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/entries").then((response) => {
      console.log(response.data);
      setTotalEntriesCount(response.data.count);
      setEntries(response.data.entries);
      setIsDataLoading(false);
    });
  }, []);


  return (
    <div className="App">
      {isDataLoading && <CircularProgress />}

      {!isDataLoading && (
        <>
          Total Count: {totalCount}<br/>
          {entries.map((entry, index) => {
            return <div key={index}>
            API is {entry.API}, Category is {entry.Category}
            <br/>
            </div>;
          })}
        </>
      )}
    </div>
  );
}

export default App;

