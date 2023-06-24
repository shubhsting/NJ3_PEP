const reviewsModel = require("../Model/reviewsModel");
const { handleException } = require("../util/exceptionHandler");

async function createReview(req, res) {
  try {
    const { rating, description, tags, menu_item_id } = req.body;
    const ratingInfo = {
      rating,
      description,
      createdAt: new Date(),
      tags,
      menu_item_id,
      restaurant_id: req.restaurant._id,
      user_id: req.user._id,
    };
    const review = await reviewsModel.create(ratingInfo);

    return res.status(200).send({
      message: "review created successfully",
      data: review,
    });
  } catch (e) {
    console.log(e)
    return handleException(e, "CREATE_REVIEW_CONTROLLER", res);
  }
}

module.exports = { createReview };
