module.exports = (sequelize, DataTypes) => {
  const TravelClass = sequelize.define(
    "TravelClass",
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return TravelClass;
};
