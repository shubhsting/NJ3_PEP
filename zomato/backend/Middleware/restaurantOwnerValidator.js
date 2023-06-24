const restaurantModel = require("../Model/restaurantModel");

async function restaurantOwnerValidator(req, res, next) {
  try {
    const { restaurantSlug } = req.params;
    const restaurant = await restaurantModel.findOne({ slug: restaurantSlug });
    if (!restaurant) {
      return res.status(400).send({
        message: "this restaurant does not exist!!",
      });
    }
    if (req.user._id != restaurant.created_by) {
      return res.status(401).send({
        message: "you are not authorised to access this restaurant!",
      });
    }
    req.restaurant = restaurant;
    next();
  } catch (e) {
    return handleException(e, "RESTAURANT_VALIDATOR_MIDDLEWARE", res);
  }
}

module.exports = { restaurantOwnerValidator };
