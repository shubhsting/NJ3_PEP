import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CustomizedDialog from "../../components/dialog";

export default function PostPage() {
  let [loading, setLoading] = useState(true);
  let [cookies, setCookies] = useCookies();
  let [postsData, setPostsData] = useState([]);
  let [userInfo, setUserInfo] = useState();
  let [myLikedPosts, setMyLikedPosts] = useState([]);
  let [openComments, setOpenComments] = useState(undefined);
  const navigate = useNavigate();

  async function likePost(postId) {
    axios({
      method: "put",
      url: `http://localhost:5000/api/post/${postId}/like`,
      headers: {
        auth_token: cookies["auth_token"],
      },
    }).then((response) => {
      console.log("post liked!!");
    });
  }
  function dialog(post) {
    return;
  }

  async function unLikePost(postId) {
    axios({
      method: "put",
      url: `http://localhost:5000/api/post/${postId}/undo-like`,
      headers: {
        auth_token: cookies["auth_token"],
      },
    }).then((response) => {
      console.log("post un-liked!!");
    });
  }

  async function likeOrUnLikePost(postId) {
    console.log(myLikedPosts);
    if (myLikedPosts.indexOf(postId) === -1) {
      // post not liked
      likePost(postId);
      setMyLikedPosts([...myLikedPosts, postId]);
    } else {
      // post liked
      unLikePost(postId);
      const newLikedPosts = myLikedPosts.filter((item) => item !== postId);
      setMyLikedPosts(newLikedPosts);
    }
  }
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
        setPostsData(response.data.posts);
        setUserInfo(response.data.user);
        setMyLikedPosts(response.data.myLikedPosts);
        setLoading(false);
      })
      .catch((e) => {
        navigate("/login");
        setLoading(false);
      });
  }, []);

  console.log(postsData);
  return (
    <div className="post-page">
      {loading && <CircularProgress />}
      {!loading && (
        <div className="posts-container">
          <ImageList sx={{ width: "100%", height: "100%" }} cols={1}>
            {postsData.map((item, index) => (
              <ImageListItem key={index}>
                <img
                  src={`${item.imageURL}`}
                  srcSet={`${item.imageURL}`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.postContent}
                  subtitle={item.User.userName}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${item.title}`}
                    >
                      <FavoriteBorderIcon
                        color={
                          myLikedPosts.indexOf(item.id) === -1
                            ? "inherit"
                            : "error"
                        }
                        onClick={() => {
                          likeOrUnLikePost(item.id);
                        }}
                      />
                      <ModeCommentIcon
                        onClick={() => {
                          setOpenComments(item);
                        }}
                      />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      )}
      {openComments && (
        <CustomizedDialog post={openComments} isOpen={true} shouldClose={setOpenComments}/>
      )}
    </div>
  );
}
