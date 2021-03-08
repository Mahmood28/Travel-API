module.exports = (sequelize, DataTypes) => {
  const Airplane = sequelize.define(
    "Airplane",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Airplane;
};
