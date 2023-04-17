import { Request, Response } from 'express';
import User, { UserModel } from '../models/User'
import { Controller } from './Controller';

export class UserController implements Controller {

  async create(req: Request, res: Response) {
    const newUser = new User(req.body);
    newUser.save()
      .then(user => res.status(200).json(user))
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal server error');
      })
  }

  getAll(req: Request, res: Response) {
    User.find()
      .then(users => res.status(200).json(users))
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal server error');
      })
  }

  async getById(req: Request, res: Response) {
    const userId = req.params.userId;
    User.findById(userId)
      .then(user => {
        if (!user) {
          res.status(404).send('User not found');
          return;
        }
        res.status(200).json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal server error');
      });
  }

  async update(req: Request, res: Response) {
    const userId = req.params.id;
    User.findByIdAndUpdate(userId, req.body)
      .then(updatedUser => {
        if (!updatedUser) {
          res.status(404).send('User not found');
          return;
        }
        res.status(200).json(updatedUser);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal server error');
      });
  }

  async delete(req: Request, res: Response) {
    const userId = req.params.id;
    User.findByIdAndDelete(userId)
      .then(deletedUser => {
        if (!deletedUser) {
          res.status(404).send('User not found');
          return;
        }
        res.status(204).send();
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal server error');
      });
  }

}