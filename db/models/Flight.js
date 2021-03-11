module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define(
    "Flight",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Flight Name already exists",
        },
      },
      departureDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      departureTime: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      arrivalTime: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      economyPrice: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      businessPrice: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
    },
    { timestamps: false }
  );

  return Flight;
};
