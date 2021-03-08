module.exports = (sequelize, DataTypes) => {
  const TravelClass = sequelize.define(
    "TravelClass",
    {
      name: {
        type: DataTypes.ENUM,
        values: ["Economy", "Business"],
        defaultValue: "Economy",
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return TravelClass;
};
