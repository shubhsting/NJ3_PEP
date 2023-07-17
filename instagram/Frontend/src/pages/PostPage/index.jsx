import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import CircularProgress from '@mui/material/CircularProgress';

export default function PostPage() {
  let [loading, setLoading] = useState(true);
  let [cookies, setCookies] = useCookies();
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/user/posts",
      headers: {
        auth_token: cookies["auth_token"],
      },
    })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="post-page">
      {loading && <CircularProgress />}
      {!loading && (
        <div className="posts-container">
          <div className="user-post">
            <div className="post-owner"></div>
            <div className="post-image"></div>
            <div className="post-footer"></div>
            <div className="post-caption"></div>
          </div>
        </div>
      )}
    </div>
  );
}
