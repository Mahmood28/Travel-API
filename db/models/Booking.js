module.exports = (sequelize, DataTypes) => {
	const Booking = sequelize.define(
		'Booking',
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			passport: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			birthday: {
				type: DataTypes.DATEONLY,
				allowNull: true,
			},
		},
		{ timestamps: false }
	);

	return Booking;
};
