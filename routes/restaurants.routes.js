const express = require('express');

// Controllers
const {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    disabledRestaurant,
    createReview,
    updateReview,
    deleteRestaurant
} = require('../controllers/restaurants.controller');

// Middlewares
const {
	createUserValidators,
} = require('../middlewares/validators.middleware');
const { restaurantExists } = require('../middlewares/restaurants.middlewares');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');

const restaurantsRouter = express.Router();

restaurantsRouter.get('/', getAllRestaurants);

restaurantsRouter.get('/:id', getRestaurantById);

restaurantsRouter.use(protectSession);

restaurantsRouter.post('/',createRestaurantValidators,createRestaurant)

restaurantsRouter
	.use('/:id', restaurantExists)
	.route('/:id')
	.patch(protectUserAccount, updateRestaurant)
	.delete(protectUserAccount, disabledRestaurant);

restaurantsRouter.post('/reviews/:restaurantId',createReview);

restaurantsRouter.patch('/reviews/:id',protectUserAccount,updateReview)

restaurantsRouter.delete('/reviews/:id',protectUserAccount, deleteRestaurant);



module.exports = { restaurantsRouter };
