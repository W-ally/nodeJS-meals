const { User } = require('./user.model');
const { Meals } = require('./meals.model');
const { Restaurants } = require('./restaurants.model');
const { Orders} = require('./orders.model');
const { Reviews} = require('./reviews.model');


const initModels = () => {

	User.hasMany(Orders, { foreignKey: 'mealId' });
	Orders.belongsTo(User);

	User.hasMany(Reviews, { foreignKey: 'userId' });
	Reviews.belongsTo(User);


	Restaurants.hasMany(Reviews, { foreignKey: 'userId' });
	Reviews.belongsTo(Restaurants);

	Restaurants.hasMany(Meals, { foreignKey: 'id' });
	Meals.belongsTo(Restaurants);
	
	Meals.hasOne(Orders, { foreignKey: 'userId' });
	Orders.belongsTo(Meals);


};

module.exports = { initModels };