module.exports = (sequelize, DataTypes) => {
  const Airline = sequelize.define(
    "Airline",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email already exists",
        },
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );

  return Airline;
};
