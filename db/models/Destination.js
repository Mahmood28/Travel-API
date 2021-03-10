module.exports = (sequelize, DataTypes) => {
  const Destination = sequelize.define(
    "Destination",
    {
      airport: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      code: {
        type: DataTypes.STRING(3),
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Destination;
};
