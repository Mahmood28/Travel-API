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
          isAfterDeparture: function (value) {
            if (new Date(value) < new Date(this.departureDate))
              throw new Error("arrival date cannot be before departure date!");
          },
        },
      },
      departureTime: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      arrivalTime: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isAfterDeparture: function (value) {
            if (
              this.arrivalDate === this.departureDate &&
              value <= this.departureTime + 2
            )
              throw new Error(
                "arrival time cannot be on or before departure time!"
              );
          },
        },
      },
      departureAirport: {
        type: DataTypes.STRING(3),
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
