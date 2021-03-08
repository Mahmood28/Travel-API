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
      arrivalDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isAfter: sequelize.col("departureDate"),
        },
      },
      departureTime: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      arrivalTime: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      departureAirport: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Flight;
};
