const db = require("../models");

async function createPost(req, res) {
  try {
    const { postContent } = req.body;
    const imageDetails = req.files[0];

    const post = await db.Post.create({
      postContent,
      imageURL: imageDetails.path,
      postedBy: req.user.id,
    });

    return res.status(200).send({
      post,
      message: "post uploaded successfully!!",
    });
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: "exception occured while creating post",
    });
  }
}

async function updatePost(req, res) {
  try {
    const { postId } = req.params;
    const { postContent, imageURL } = req.body;
    const post = await db.Post.findOne({ where: { id: postId } });

    if (post.postedBy != req.user.id) {
      return res.status(401).send({
        message: "you are not authorised to edit this post",
      });
    }

    let updateobject = {};

    if (postContent) {
      updateobject = { ...updateobject, postContent };
    } else if (imageURL) {
      updateobject = { ...updateobject, imageURL };
    }

    await db.Post.update(updateobject, { where: { id: postId } });

    return res.status(200).send({
      message: "post updated successfully!!",
    });
  } catch (e) {
    return res.status(500).send({
      message: "exception occured while updating post",
    });
  }
}

async function deletePost(req, res) {
  try {
    const { postId } = req.params;
    const post = await db.Post.findOne({ where: { id: postId } });

    if (post.postedBy != req.user.id) {
      return res.status(401).send({
        message: "you are not authorised to delete this post",
      });
    }

    await db.Post.destroy({ where: { id: postId } });
    return res.status(200).send({
      message: "post deleted",
    });
  } catch (e) {
    return res.status(500).send({
      message: "exception occured while deleting post",
    });
  }
}

module.exports = { createPost, deletePost, updatePost };
