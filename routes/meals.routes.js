const express = require('express');

// Controllers
const {
	createMeal,
  getAllMeal,
  getAllMealId,
  updateMeal,
  disabledMeal
} = require('../controllers/users.controller');

// Middlewares
const {
	createMealValidators,
} = require('../middlewares/validators.middleware');
const { userExists } = require('../middlewares/users.middleware');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');

const mealRouter = express.Router();

mealRouter.get('/',getAllMeal)

mealRouter.get('/:id',getAllMealId)

mealRouter.use(protectSession);

mealRouter.post('/signup', createMealValidators, createMeal);
mealRouter.post('/login', login);


mealRouter
	//.use('/:id', userExists)
	.route('/:id')
	.patch(protectUserAccount, updateMeal)
	.delete(protectUserAccount, disabledMeal);




module.exports = { mealRouter };
