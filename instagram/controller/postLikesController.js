const db = require("../models");

async function addLike(req, res) {
  try {
    const { postId } = req.params;

    const post = await db.Post.findByPk(postId);

    const newLikeCount = post.likeCount + 1;
    await db.Post.update(
      { likeCount: newLikeCount },
      { where: { id: postId } }
    );

    await db.PostLike.create({ postId, userId: req.user.id });
    return res.status(200).send({ message: "post liked" });
  } catch (e) {
    return res.status(500).send({
      message: "exception occurred while liking the post",
    });
  }
}

async function undoLike(req, res) {
  try {
    const { postId } = req.params;

    const post = await db.Post.findByPk(postId);

    const newLikeCount = post.likeCount - 1;
    await db.Post.update(
      { likeCount: newLikeCount },
      { where: { id: postId } }
    );
    await db.PostLike.destroy({ where: { postId, userId: req.user.id } });
    return res.status(200).send({ message: "post un liked" });
  } catch (e) {
    return res.status(500).send({
      message: "exception occurred while unliking the post",
    });
  }
}

module.exports = { addLike, undoLike };
