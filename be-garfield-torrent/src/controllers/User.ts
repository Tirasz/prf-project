import { Request, Response } from 'express';
import User, { bootstrapUsers } from '../models/User'
import { Controller } from './Controller';
import { validateUserId } from '../utils/validators';

export class UserController implements Controller {

  constructor() {
    bootstrapUsers();
  }

  create(req: Request, res: Response) {
    const newUser = new User(req.body);
    if (!newUser) { res.status(400).send('[USER] Missing new user!'); return }

    newUser.save()
      .then(user => res.status(200).json(user))
      .catch(err => {
        console.error(err);
        res.status(500).send('[USER] Internal server error');
      })
  }

  getAll(req: Request, res: Response) {
    User.find()
      .then(users => res.status(200).json(users))
      .catch(err => {
        console.error(err);
        res.status(500).send('[USER] Internal server error');
      })
  }

  getById(req: Request, res: Response) {
    const validateResult = validateUserId(req.params.userId);
    if (!validateResult.userId) { res.status(400).send('[USER] ' + validateResult.err); return }

    User.findById(validateResult.userId)
      .then(user => {
        if (!user) {
          res.status(404).send('[USER] User not found');
          return;
        }
        res.status(200).json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('[USER] Internal server error');
      });
  }

  update(req: Request, res: Response) {
    const validateResult = validateUserId(req.params.userId);
    if (!validateResult.userId) { res.status(400).send('[USER] ' + validateResult.err); return }
    if (!req.body) { res.status(400).send('[USER] Missing values for update!'); return }

    User.findByIdAndUpdate(validateResult.userId, req.body)
      .then(updatedUser => {
        if (!updatedUser) {
          res.status(404).send('[USER] User not found');
          return;
        }
        res.status(200).json(updatedUser);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('[USER] Internal server error');
      });
  }

  delete(req: Request, res: Response) {
    const validateResult = validateUserId(req.params.userId);
    if (!validateResult.userId) { res.status(400).send('[USER] ' + validateResult.err); return }

    User.findByIdAndDelete(validateResult.userId)
      .then(deletedUser => {
        if (!deletedUser) {
          res.status(404).send('[USER] User not found');
          return;
        }
        res.status(204).send();
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('[USER] Internal server error');
      });
  }

}
