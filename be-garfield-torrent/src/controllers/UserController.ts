import { Request, Response } from 'express';
import User from '../models/User'
import { Controller } from './Controller';
import { validateObjectId } from '../utils/validators';

export class UserController implements Controller {

  create(req: Request, res: Response) {
    const newUser = new User(req.body);

    newUser.save()
      .then(user => res.status(200).json(user))
      .catch(err => {
        if (err.name == "ValidationError")
          res.status(400).send(err);
        else
          res.status(500).send(err);
      })
  }

  getAll(req: Request, res: Response) {
    User.find()
      .then(users => res.status(200).json(users))
      .catch(err => {
        res.status(500).send(err);
      })
  }

  getById(req: Request, res: Response) {
    const validateResult = validateObjectId(req.params.userId);
    if (!validateResult.objectId) { res.status(400).send(validateResult.err); return }

    User.findById(validateResult.objectId)
      .then(user => {
        if (!user) {
          res.status(404).send('User not found');
          return;
        }
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }

  update(req: Request, res: Response) {
    const validateResult = validateObjectId(req.params.userId);
    if (!validateResult.objectId) { res.status(400).send(validateResult.err); return }


    User.findByIdAndUpdate(validateResult.objectId, req.body, { runValidators: true })
      .then(updatedUser => {
        if (!updatedUser) {
          res.status(404).send('User not found');
          return;
        }
        res.status(200).json(updatedUser);
      })
      .catch(err => {
        if (err.name == "ValidationError")
          res.status(400).send(err);
        else
          res.status(500).send(err);
      });
  }

  promote(req: Request, res: Response) {
    const validateResult = validateObjectId(req.params.userId);
    if (!validateResult.objectId) { res.status(400).send(validateResult.err); return }

    User.findByIdAndUpdate(validateResult.objectId, { accessLevel: 3 })
      .then(updatedUser => {
        if (!updatedUser) {
          res.status(404).send('User not found');
          return;
        }
        res.status(200).json(updatedUser);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }

  delete(req: Request, res: Response) {
    const validateResult = validateObjectId(req.params.userId);
    if (!validateResult.objectId) { res.status(400).send(validateResult.err); return }

    User.findByIdAndDelete(validateResult.objectId)
      .then(deletedUser => {
        if (!deletedUser) {
          res.status(404).send('User not found');
          return;
        }
        res.status(200).send(deletedUser);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }

}
