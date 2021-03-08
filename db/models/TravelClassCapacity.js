module.exports = (sequelize, DataTypes) => {
  const TravelClassCapacity = sequelize.define(
    "TravelClassCapacity",
    {
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vacancy: {
        type: DataTypes.INTEGER,
        DefaultValue: sequelize.col("capacity"),
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return TravelClassCapacity;
};
