module.exports = (sequelize, DataTypes) => {
  const Destination = sequelize.define(
    "Destination",
    {
      airport: {
        type: DataTypes.STRING,
        allowNull: true,
        //unique constraint
        //allowNull should be false
      },
      code: {
        type: DataTypes.STRING(3),
        allowNull: true,
        //unique constraint
        //allowNull should be false
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Destination;
};
