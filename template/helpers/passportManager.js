const passport = require('passport');
const passportJWT = require("passport-jwt");
const isEmpty = require('lodash/isEmpty');
const LocalStrategy = require('passport-local').Strategy;
const { saltHashPassword } = require('./utils');
const { getUserWithPasswordBy } = require('../services/userServices');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const { AUTH_SECRET } = process.env;

const validateUserAndPassword = (user, password) => {
  if (isEmpty(user)) return { validated: false };

  const hashPassword = saltHashPassword(password);
  console.log("🚀 ~ file: passportManager.js ~ line 17 ~ validateUserAndPassword ~ hashPassword", hashPassword)
  if (hashPassword !== user.password) return { validated: false };

  return { validated: true };
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'phone',
      passwordField: 'password'
    },
    async (phone, password, done) => {
      console.log("🚀 ~ file: passportManager.js ~ line 33 ~ phone", phone)
      const user = await getUserWithPasswordBy(phone);
      console.log("🚀 ~ file: passportManager.js ~ line 31 ~ user", user)
      const { validated } = validateUserAndPassword(user, password);

      if (!validated) {
        const message = '使用者不存在或密碼錯誤';
        const notfoundError = new Error(message);
        return done(notfoundError, null, { message });
      }
      console.log("🚀 ~ file: passportManager.js ~ line 68 ~ user", user)
      return done(null, user);
    }
  )
);


passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: AUTH_SECRET
},
  function (jwtPayload, done) {
    done(null, jwtPayload, { message: 'Logged In Successfully' });
  }
));

//Todo: 新增 session
passport.serializeUser((user, done) => {
  done(null, user);
});
//Todo: 移除 session
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports.jwtAuthorizationMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { session: true }, (err, user, info) => {
    console.log("🚀 ~ file: passportManager.js ~ line 68 ~ passport.authenticate ~ info", info)
    console.log("🚀 ~ file: passportManager.js ~ line 68 ~ passport.authenticate ~ user", user)
    if (err || !user) {
      const err = {
        success: false,
        data: {
          message: 'authorization fail',
        }        
      };

      return res.status(401).json(err); // send the error response to client
    }
    return next(null, user);
  })(req, res, next);
}
