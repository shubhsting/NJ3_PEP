const express = require("express");
const { createPost, updatePost, deletePost } = require("../controller/postsController");
const { addLike, undoLike } = require("../controller/postLikesController");
const { addPostComment, updatePostComment, deletePostComment } = require("../controller/postCommentsController");


const postsRouter = express.Router()

postsRouter.post("/create", createPost);
postsRouter.post("/:postId/update", updatePost)
postsRouter.delete(":/postId", deletePost);


postsRouter.put("/:postId/like", addLike)
postsRouter.put("/:postId/undo-like", undoLike)


postsRouter.post("/:postId/comment", addPostComment)
postsRouter.post("/:postId/update-comment", updatePostComment)
postsRouter.delete("/:postId/comment", deletePostComment)



module.exports = postsRouter;