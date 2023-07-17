const db = require("../models");

async function createfollowRequest(req, res) {
  try {
    const { userId } = request.params;
    if (req.user.id == userId) {
      return res.status(400).send({
        message: "follow request sendor and acceptor cannot be same",
      });
    }
    await db.FollowRequest.create({
      sentBy: req.user.id,
      sentTo: userId,
      status: "PENDING",
    });
    return res.status(200).send({
      message: "request accepted successfully!!",
    });
  } catch (e) {
    return res.status(500).send({
      message: "exception occured while creating follow request!!",
    });
  }
}

async function updateFollowRequest(req, res) {
  try {
    const { userId } = request.params;
    const { status } = req.body;
    await db.FollowRequest.update(
      { status },
      { where: { sentBy: req.user.id, sentTo: userId } }
    );
    return res.status(200).send({
      message: "follow request updated successfully!!",
    });
  } catch (e) {
    return res.status(500).send({
      message: "exception occured while updating follow request!!",
    });
  }
}

async function deleteFollowRequest(req, res) {
  try {
    const { userId } = request.params;
    const followRequest = await db.FollowRequest.find({
      where: { sentBy: req.user.id, sentTo: userId },
    });
    if (!followRequest) {
      return res.status(400).send({
        message: "follow request not found for this user!!",
      });
    }
    await db.FollowRequest.destroy({
      where: { sentBy: req.user.id, sentTo: userId },
    });
    return res.status(200).send({
      message: "follow request deleted!!",
    });
  } catch (e) {
    return res.status(500).send({
      message: "exception occured while deleting follow request!!",
    });
  }
}

module.exports = {
  createfollowRequest,
  updateFollowRequest,
  deleteFollowRequest,
};
