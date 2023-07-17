const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
} = require("../controller/postsController");
const { addLike, undoLike } = require("../controller/postLikesController");
const {
  addPostComment,
  updatePostComment,
  deletePostComment,
} = require("../controller/postCommentsController");
const userAuth = require("../middleware/userAuth");

const postsRouter = express.Router();

postsRouter.post("/create", userAuth, createPost);
postsRouter.post("/:postId/update", userAuth, updatePost);
postsRouter.delete(":/postId", userAuth, deletePost);

postsRouter.put("/:postId/like", userAuth, addLike);
postsRouter.put("/:postId/undo-like", userAuth, undoLike);

postsRouter.post("/:postId/comment", userAuth, addPostComment);
postsRouter.post("/:commentId/update-comment/", userAuth, updatePostComment);
postsRouter.delete("/:commentId/comment", userAuth, deletePostComment);

module.exports = postsRouter;
