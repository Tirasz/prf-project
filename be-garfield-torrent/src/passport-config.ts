import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User, { IUser } from './models/User';

declare global {
  namespace Express {
    interface User extends IUser {
      id?: string
    }
  }
}


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
  if (!user._id)
    done('No user to login!', null);
  done(null, user._id);
})

passport.deserializeUser((userId: string, done) => {
  if (!userId)
    return done("No user to logout!", null);
  User.findById(userId)
    .then(user => {
      if (user)
        user.id = user._id.toString();
      return done(null, user);
    })
    .catch(err => { return done(err, null); })
});

export default passport;