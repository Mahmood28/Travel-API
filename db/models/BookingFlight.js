module.exports = (sequelize, DataTypes) => {
	const BookingFlight = sequelize.define(
		'BookingFlight',
		{},
		{ timestamps: false }
	);

	return BookingFlight;
};
