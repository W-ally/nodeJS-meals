// Models
const { Order } = require('../models/orders.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');


const createOrder = catchAsync(async (req, res, next) => {
    const { quantity, mealId } = req.body;
  
    const newOrder = await Order.create({ quantity, mealId });
  
    res.status(201).json({ newOrder });
  });

const getAllOrder = catchAsync(async (req, res, next) => {
  const allOrder = await Order.findAll();

  res.status(200).json({
    allOrder,
  });
});
const updateOrder = catchAsync(async (req, res, next) => {
    const { order } = req;
    const { status } = req.body;
  
  
    await Order.update({ status:'completed' });
  
    res.status(200).json({ status: 'success' });
  });


const deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await Order.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
   createOrder,
   getAllOrder,
   updateOrder,
   deleteOrder,
};
