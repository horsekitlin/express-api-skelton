import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { AuthService } from '../services/authServices';
import { Request } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

export const configurePassport = (authService: AuthService) => {
  // JWT Strategy for App
  passport.use('jwt-app', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
    passReqToCallback: true
  }, async (req, payload: any, done) => {
    try {
      const user = await authService.getUserById(payload.id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }));

  // JWT Strategy for Web
  passport.use('jwt-web', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromAuthHeaderAsBearerToken(),
      (req: Request) => req.cookies?.token
    ]),
    secretOrKey: JWT_SECRET,
    passReqToCallback: true
  }, async (req, payload: any, done) => {
    try {
      const user = await authService.getUserById(payload.id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }));

  // Local Strategy for Web login
  passport.use('local', new LocalStrategy({
    usernameField: 'phone',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, phone, password, done) => {
    try {
      const user = await authService.validateUser(phone, password);
      if (!user) {
        return done(null, false, { message: 'Invalid credentials' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  return passport;
};
