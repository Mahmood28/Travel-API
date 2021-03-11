const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcrypt");
const { User, Airline } = require("../db/models");
// const jwt = require("jsonwebtoken");
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("../config/keys");

// exports.jwtStrategy = new JWTStrategy(
//   {
//     jwtFromRequest: fromAuthHeaderAsBearerToken(),
//     secretOrKey: JWT_SECRET,
//   },
//   async (jwtPayload, done) => {
//     if (Date.now() > jwtPayload.exp) {
//       return done(null, false);
//     }
//     try {
//       const user = await User.findByPk(jwtPayload.id);
//       return done(null, user);
//     } catch (error) {
//       done(error);
//     }
//   }
// );

module.exports = function (passport) {
  passport.use(
    "user",
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({
          where: {
            username,
          },
        });
        let passwordsMatch = user
          ? await bcrypt.compare(password, user.password)
          : false;
        return done(null, passwordsMatch ? user : false);
      } catch (error) {
        return done(error);
      }
    })
  );
  passport.use(
    "airline",
    new LocalStrategy(async (username, password, done) => {
      try {
        const airline = await Airline.findOne({
          where: {
            username,
          },
        });
        let passwordsMatch = airline
          ? await bcrypt.compare(password, airline.password)
          : false;
        return done(null, passwordsMatch ? airline : false);
      } catch (error) {
        return done(error);
      }
    })
  );
  passport.use(
    "jwt-airline",
    new JWTStrategy(
      {
        jwtFromRequest: fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
      },
      async (jwtPayload, done) => {
        if (Date.now() > jwtPayload.exp) {
          return done(null, false);
        }
        try {
          const airline = await Airline.findByPk(jwtPayload.id);
          return done(null, airline);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  passport.use(
    "jwt-user",
    new JWTStrategy(
      {
        jwtFromRequest: fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
      },
      async (jwtPayload, done) => {
        if (Date.now() > jwtPayload.exp) {
          return done(null, false);
        }
        try {
          const user = await User.findByPk(jwtPayload.id);
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
