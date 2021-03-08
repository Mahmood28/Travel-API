module.exports = (sequelize, DataTypes) => {
  const TravelClass = sequelize.define(
    "TravelClass",
    {
      type: {
        type: DataTypes.ENUM("Economy", "Business"),
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return TravelClass;
};
