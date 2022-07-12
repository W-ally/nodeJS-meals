const express = require('express');

// Controllers
const {
	createOrder,
   getAllOrder,
   updateOrder,
   deleteOrder,
} = require('../controllers/orders.controller');

// Middlewares
const {
	createOrderValidators,
} = require('../middlewares/validators.middleware');

const {
	protectSession,
	
} = require('../middlewares/auth.middleware');

const ordersRouter = express.Router();

ordersRouter.use(protectSession);

ordersRouter.post('/', createOrderValidators, createOrder);

ordersRouter.get('/me', getAllOrder);


ordersRouter
	//.use('/:id', userExists)
	.route('/:id')
	.patch( updateOrder)
	.delete( deleteOrder);


module.exports = { ordersRouter };