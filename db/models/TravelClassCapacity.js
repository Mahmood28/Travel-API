module.exports = (sequelize, DataTypes) => {
  const TravelClassCapacity = sequelize.define(
    "TravelClassCapacity",
    {
      seats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return TravelClassCapacity;
};
