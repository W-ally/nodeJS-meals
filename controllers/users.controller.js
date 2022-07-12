const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');
const { Orders } = require('../models/orders.model');
const { Comment } = require('../models/comment.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');


dotenv.config({ path: './config.env' });



const createUser = catchAsync(async (req, res, next) => {
	const { name,  email, password } = req.body;

	// Hash password
	const salt = await bcrypt.genSalt(12);
	const hashPassword = await bcrypt.hash(password, salt);

	const newUser = await User.create({
		name,
		email,
		password: hashPassword,
	});

	// Remove password from response
	newUser.password = undefined;

	res.status(201).json({
		status: 'success',
		newUser,
	});
});

const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate credentials (email)
	const user = await User.findOne({
		where: {
			email,
			status: 'active',
		},
	});

	if (!user) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Validate password
	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Generate JWT (JsonWebToken) ->
	const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	// Send response
	res.status(200).json({
		status: 'success',
		token,
	});
});


const updateUser = catchAsync(async (req, res, next) => {
	const { user } = req;
	const { name } = req.body;
	const { email } = req.body;


	await user.update({ name, email });

	res.status(204).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
	const { user } = req;

	// await user.destroy();
	await user.update({ status: 'Disable' });

	res.status(204).json({ status: 'success' });
});



const getUsersOrders = catchAsync(async (req, res, next) => {
	const users = await User.findAll({
		where: {
			
			status: 'active',
		},
		include: [
			{ model: Orders},
					],
	});

	res.status(200).json({
		status: 'success',
		users,
	});
});

const getUsersOrdersID = catchAsync(async (req, res, next) => {

	const users = await User.findAll({

		where: {

      id,
			status: 'active',
		},
		include: [
			{ model: Orders},
					],
	});

	res.status(200).json({
		status: 'success',
		users,
	});
});

module.exports = {
	
	createUser,
	updateUser,
	deleteUser,
	login,
  getUsersOrders,
  getUsersOrdersID,
};