// Models
const { Restaurant } = require('../models/restaurants.model');
const { Reviews} = require('../models/reviews.model')

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');



const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Task.create({ name, address, rating});

  res.status(201).json({ newRestaurant });
});

const getAllRestaurants = catchAsync(async (req, res, next) => {
    const restaurants = await Restaurant.findAll();
  
    res.status(200).json({
      restaurants,
    });
  });


const getRestaurantById = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
  
    res.status(200).json({
      restaurant,
    });
  });


  const updateRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
    const { name } = req.body;
    const { address } = req.body;
  
    await Restaurant.update({ name, address });
  
    res.status(200).json({ status: 'success' });
  });

  const disabledRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
  
    await Restaurant.update({ status: 'Disabled' });
  
    res.status(200).json({
      status: 'success',
    });
  });


const createReview = catchAsync(async (req, res, next) => {
    const { comment,rating,  } = req.body;
  
    const newReview = await Restaurant.create({ comment, rating});

    include: [
			{ model: Reviews,attributes: [ 'comment', 'rating']},
					],
  
    res.status(201).json({ newReview });
  });


const updateReview = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
    const { comment } = req.body;
    const { rating } = req.body;
  
    await user.update({ comment, rating });

    include: [
			{ model: Reviews,attributes: [ 'comment', 'rating']},
					],
  
    res.status(200).json({ status: 'success' });
  });

  
  const deleteRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
  
    await Restaurant.update({ status: 'deleted' });
  
    res.status(200).json({
      status: 'success',
    });
  });






module.exports = {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    disabledRestaurant,
    createReview,
    updateReview,
    deleteRestaurant
};
