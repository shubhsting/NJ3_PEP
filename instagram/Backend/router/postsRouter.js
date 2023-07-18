const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
} = require("../controller/postsController");
const multer = require("multer");
const { addLike, undoLike } = require("../controller/postLikesController");
const {
  addPostComment,
  updatePostComment,
  deletePostComment,
} = require("../controller/postCommentsController");
const userAuth = require("../middleware/userAuth");
const postsRouter = express.Router();

const storageConfiguration = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, "public/images")
  },
  filename: function(req, file, cb) {
      cb(null, `user-${Date.now()}.jpg`)
  }
})
postsRouter.use(express.urlencoded({ extended: false }))

function multerFileFilter(req, file, cb) {
  if(file.mimetype.includes("image")) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

const upload = multer({storage: storageConfiguration, fileFilter: multerFileFilter})


postsRouter.post("/create", userAuth, upload.any(), createPost);
postsRouter.post("/:postId/update", userAuth, updatePost);
postsRouter.delete(":/postId", userAuth, deletePost);

postsRouter.put("/:postId/like", userAuth, addLike);
postsRouter.put("/:postId/undo-like", userAuth, undoLike);

postsRouter.post("/:postId/comment", userAuth, addPostComment);
postsRouter.post("/:commentId/update-comment/", userAuth, updatePostComment);
postsRouter.delete("/:commentId/comment", userAuth, deletePostComment);

module.exports = postsRouter;
