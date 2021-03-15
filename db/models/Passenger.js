module.exports = (sequelize, DataTypes) => {
  const Passenger = sequelize.define(
    "Passenger",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passport: {
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
        //   validate: {
        //     isEmail: true
        //   }
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    { timestamps: false }
  );

  return Passenger;
};
