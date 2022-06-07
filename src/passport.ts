import passportGoogle from 'passport-google-oauth20';
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

const GoogleStrategy = passportGoogle.Strategy;

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: '/auth/google/callback',
      passReqToCallback: true,
    },
    function (req: Request, accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((req, user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
