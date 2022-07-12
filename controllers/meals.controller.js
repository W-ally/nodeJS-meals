// Models
const { Meal } = require('../models/meals.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const createMeal = catchAsync(async (req, res, next) => {
    const { name, price } = req.body;
  
    const meal = await Meal.create({ name, price });
  
    res.status(201).json({ meal });
  });

const getAllMeal = catchAsync(async (req, res, next) => {
    const { status } = req.params;

    const validStatus = ['active', 'completed', 'cancelled'];
  
    const isValid = validStatus.find(el => el === status);
  
    if (!isValid) {
      return next(
        new AppError(
          'Product dont active',
          400
        )
      );
    }
  
    const meal = await Meal.findAll({ where: { status } });
  
    res.status(200).json({ meal });
});

const getAllMealId = catchAsync(async (req, res, next) => {
    const { meal } = req;
    const { status } = req.params;

    const validStatus = ['active', 'completed', 'cancelled'];
  
    const isValid = validStatus.find(el => el === status);
  
    if (!isValid) {
      return next(
        new AppError(
          'Product dont active',
          400
        )
      );
    }
  
    const meals = await Meal.findAll({ where: { status } });
  
    res.status(200).json({ meals });
});

const updateMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;
    const { name } = req.body;
    const { price } = req.body;
  
    await Meal.update({ name, price });
  
    res.status(200).json({ status: 'success' });
  });

  const disabledMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;
  
    await Meal.update({ status: 'disabled' });
  
    res.status(200).json({
      status: 'success',
    });
  });





module.exports = {
  createMeal,
  getAllMeal,
  getAllMealId,
  updateMeal,
  disabledMeal

};
