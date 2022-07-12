// Models
const { Restaurant } = require('../models/restaurants.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const restaurantExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: { id, status: 'active' },
  });

  if (!restaurant) {
    return next(new AppError('The restaurant does not exist with given Id', 404));
  }

  // Add user data to the req object
  req.restaurant = restaurant;
  next();
});

module.exports = {
  restaurantExists,
};
