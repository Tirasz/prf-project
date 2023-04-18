import express, { Router } from 'express';
import passport from '../passport-config';

const router = express.Router();

router.route('/login').post((req, res, next) => {
  if (!(req.body.username && req.body.password))
    return res.status(400).send('[AUTH] Missing username or password!')

  passport.authenticate('local', (err, user) => {
    if (err) return res.status(500).send(err);
    req.login(user, (err) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send('[AUTH] Authentication successful!');
    })
  })(req, res, next);
});

router.route('/logout').post((req, res, next) => {
  if (!req.isAuthenticated()) return res.status(403).send('Not authenticated!');
  req.logout((err) => {
    if (err) res.status(500).send(err);
    return res.status(200).send('[AUTH] Logout successful!');
  })
});

router.route('/status').get((req, res, next) => {
  if (!req.isAuthenticated()) return res.status(403).send('[AUTH] Not authenticated!');
  return res.status(200).send(req.user);
})

export default router;