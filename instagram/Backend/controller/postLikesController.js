const db = require("../models");

async function addLike(req, res) {
  try {
    const { postId } = req.params;

    const post = await db.Post.findByPk(parseInt(postId));
    const postLike = await db.PostLike.findOne({
      where: { postId: parseInt(postId), userId: req.user.id },
    });
    if (postLike) {
      return res.status(400).send({
        message: "you can not add multiple likes to this image!!",
      });
    }
    const newLikeCount = post.likesCount + 1;
    await db.Post.update(
      { likesCount: newLikeCount },
      { where: { id: postId } }
    );

    await db.PostLike.create({ postId, userId: req.user.id });
    return res.status(200).send({ message: "post liked" });
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: "exception occurred while liking the post",
    });
  }
}

async function undoLike(req, res) {
  try {
    const { postId } = req.params;

    const post = await db.Post.findByPk(postId);
    const postLike = await db.PostLike.findOne({
      where: { postId, userId: req.user.id },
    });
    if (!postLike) {
      return res.status(400).send({
        message: "you can not un like a post because you never liked it!!",
      });
    }
    const newLikeCount = post.likesCount - 1;
    await db.Post.update(
      { likesCount: newLikeCount },
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
