const restaurantModel = require("../Model/restaurantModel");
const { handleException } = require("../util/exceptionHandler");

async function restaurantValidator(req, res, next) {
  try {
    const { restaurantSlug } = req.params;
    const restaurant = await restaurantModel.findOne({ slug: restaurantSlug });
    if (!restaurant) {
      return res.status(400).send({
        message: "this restaurant does not exist!!",
      });
    }
    req.restaurant = restaurant;
    next();
  } catch (e) {
    return handleException(e, "RESTAURANT_VALIDATOR_MIDDLEWARE", res);
  }
}

module.exports = { restaurantValidator };
