import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/User';

const authenticateUser = (email, password, done) => {
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return done('Incorrect email or password!', false);
      }
      user.comparePasswords(password)
        .then(result => {
          if (!result)
            return done('Incorrect email or password!', false);
          return done(null, user);
        })
        .catch(err => { return done(err); })
    })
};

const strategy = new LocalStrategy(authenticateUser);

passport.use('local', strategy);

passport.serializeUser((user, done) => {
  if (!user)
    return done('No user to login!', null);
  return done(null, user);
})

passport.deserializeUser((user, done) => {
  if (!user)
    return done("No user to logout!", null);
  return done(null, user);
});

export default passport;