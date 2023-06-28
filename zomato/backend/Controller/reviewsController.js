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
    console.log(e);
    return handleException(e, "CREATE_REVIEW_CONTROLLER", res);
  }
}

// get all  reviews for a user
async function fetchUserReviews(req, res) {
  try {
    const reviews = await reviewsModel.find({ user_id: req.user._id });
    return res.status(200).send({
      message: "reviews fetched successfully!!!",
      data: reviews,
    });
  } catch (e) {
    return handleException(e, "FETCH_USER_REVIEWS", res);
  }
}

async function fetchRestaurantReviews(req, res) {
  try {
    // average rating
    const reviews = await reviewsModel.find({
      restaurant_id: req.restaurant._id,
    });

    let ratingSum = 0;
    for (const review of reviews) {
      ratingSum = ratingSum + review.rating;
    }
    return res.status(200).send({
      message: "reviews fetched successfully!!!",
      data: {
        reviews,
        averageRating: ratingSum / reviews.length,
      },
    });
  } catch (e) {
    return handleException(e, "FETCH_RESTAURANT_REVIEWS", res);
  }
}

module.exports = { createReview, fetchRestaurantReviews, fetchUserReviews };
