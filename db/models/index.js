'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Reations
db.Airline.hasMany(db.Flight, { foreignKey: 'airlineId', as: 'flights' });
db.Flight.belongsTo(db.Airline, { foreignKey: 'airlineId', as: 'airlines' });

db.Destination.hasMany(db.Flight, {
	foreignKey: { fieldName: 'destinationId' },
	as: 'flights',
});

db.Flight.belongsTo(db.Destination, {
	foreignKey: { fieldName: 'destinationId' },
	as: 'destination',
});

db.Flight.hasMany(db.TravelClassCapacity, {
	foreignKey: { fieldName: 'flightId' },
	as: 'capacities',
});

db.TravelClassCapacity.belongsTo(db.Flight, {
	foreignKey: { fieldName: 'flightId' },
	as: 'flight',
});

db.TravelClass.hasMany(db.TravelClassCapacity, {
	foreignKey: { fieldName: 'travelClassId' },
	as: 'capacities',
});

db.TravelClassCapacity.belongsTo(db.TravelClass, {
	foreignKey: { fieldName: 'travelClassId' },
	as: 'travelClass',
});

db.User.hasMany(db.Booking, { as: 'book', foreignKey: 'userId' });

db.Booking.belongsTo(db.User, { as: 'user' });

db.TravelClass.hasMany(db.Booking, { as: 'book', foreignKey: 'travelClassId' });

db.Booking.belongsTo(db.TravelClass, { as: 'travelClass' });

module.exports = db;
