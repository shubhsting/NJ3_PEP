const db = require("../models");

async function addPostComment(req, res) {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    const post = await db.Post.findByPk(postId);

    if (!post) {
      return res.status(400).send({
        message: "post doesn't exist!",
      });
    }
    const postComment = await db.PostComment.create({
      postId: parseInt(postId),
      content,
      commentedBy: req.user.id,
    });

    return res.status(200).send({
      message: "post comment added",
      postComment,
    });
  } catch (e) {
    return res.status(500).send({
      message: "error occurred while adding post comment",
    });
  }
}

async function deletePostComment(req, res) {
  try {
    const { commentId } = req.params;
    const postComment = await db.PostComment.findByPk(commentId);
    if (!postComment) {
      return res.status(400).send({
        message: "post comment does not exist!!",
      });
    }

    if (postComment.commentedBy != req.user.id) {
      return res.status(401).send({
        message: "you are not authorised to delete this post comment!!",
      });
    }
    await db.PostComment.destroy({ where: { id: commentId } });
    return res.status(200).send({
      message: "postcomment deleted",
    });
  } catch (e) {
    return res.status(500).send({
      message: "error occurred while deleting post comment",
    });
  }
}

async function updatePostComment(req, res) {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const postComment = await db.PostComment.findByPk(commentId);
    if (!postComment) {
      return res.status(400).send({
        message: "post comment does not exist!!",
      });
    }
    if (postComment.commentedBy != req.user.id) {
      return res.status(401).send({
        message: "you are not authorised to update this post comment!!",
      });
    }
    await db.PostComment.update({ content }, { where: { id: commentId } });
    return res.status(200).send({
      message: "postcomment updated",
    });
  } catch (e) {
    return res.status(500).send({
      message: "error occurred while updating post comment",
    });
  }
}

module.exports = { addPostComment, deletePostComment, updatePostComment };
