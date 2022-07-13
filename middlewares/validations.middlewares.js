const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError');

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    // [msg, msg, msg] -> 'msg. msg. msg'
    const errorMsg = messages.join('. ');

    return next(new AppError(errorMsg, 400));
  }

  next();
};

const createUserValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  checkValidations,
];

const createMealValidations = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isString()
    .withMessage('Name must be a string'),
  body('price')
    .isNumeric()
    .withMessage('Price id must be a number')
    .custom(val => val > 0)
    .withMessage('User id cannot be a negative value'),
  body('restaurantId')
    .isNumeric()
    .withMessage('RestaurantId must be a number')
    .custom(val => val > 0)
    .withMessage('RestaurantId id cannot be a negative value'),
  checkValidations,
];

const createOrderValidations = [
body('mealId')
  .isNumeric()
  .withMessage('MealId id must be a number')
  .custom(val => val > 0)
  .withMessage('MealId id cannot be a negative value'),
body('userId')
  .isNumeric()
  .withMessage('UserId id must be a number')
  .custom(val => val > 0)
  .withMessage('UerId id cannot be a negative value'),
body('totalprice')
  .isNumeric()
  .withMessage('TotalPrice id must be a number')
  .custom(val => val > 0)
  .withMessage('TotalPrice id cannot be a negative value'),
body('quantity')
  .isNumeric()
  .withMessage('Quantity id must be a number')
  .custom(val => val > 0)
  .withMessage('Quantity id cannot be a negative value'),
  
  checkValidations,
];

const createRestaurantValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  checkValidations,
];

module.exports = {
  createUserValidations,
  createMealValidations,
  createOrderValidations,
  createRestaurantValidations,
};
