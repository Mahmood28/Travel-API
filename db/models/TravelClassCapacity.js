module.exports = (sequelize, DataTypes) => {
  const TravelClassCapacity = sequelize.define(
    "TravelClassCapacity",
    {
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return TravelClassCapacity;
};
