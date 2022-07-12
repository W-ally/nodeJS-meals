// Models
const { Meal } = require('../models/meals.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const mealExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: { id, status: 'active' },
  });

  if (!meal) {
    return next(new AppError('Meal does not exist with given Id', 404));
  }

  // Add user data to the req object
  req.meal = meal;
  next();
});

module.exports = {
  mealExists,
};
