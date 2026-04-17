const passport = require('passport');
const passportJWT = require('passport-jwt');
const { Users } = require('../../models');

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // ❗ INI WAJIB
    },
    async (payload, done) => {
      const user = await Users.findOne({ email: payload.email });

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    }
  )
);

module.exports = passport;
