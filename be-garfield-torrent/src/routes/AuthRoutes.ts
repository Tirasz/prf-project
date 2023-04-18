import express, { Router } from 'express';
import passport from '../passport-config';

const router = express.Router();

router.route('/login').post((req, res, next) => {
  if (!(req.body.username && req.body.password))
    return res.status(400).send({})

  passport.authenticate('local', (err, user) => {
    if (err) return res.status(401).send(err);
    req.login(user, (err) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send({});
    })
  })(req, res, next);
});

router.route('/logout').post((req, res, next) => {
  if (!req.isAuthenticated()) return res.status(403).send({});
  req.logout((err) => {
    if (err) res.status(500).send(err);
    return res.status(200).send({});
  })
});

router.route('/status').get((req, res, next) => {
  if (!req.isAuthenticated()) return res.status(200).send({ user: null });
  return res.status(200).send({ user: req.user });
})

export default router;