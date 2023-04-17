import express, { Router } from 'express';
import { UserController } from '../controllers/User';

export class UserRoutes {
  public router: Router;
  public userController: UserController;

  constructor() {
    this.router = express.Router();
    this.userController = new UserController();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get('/', this.userController.getAll);
    this.router.get('/:id', this.userController.getById);
    this.router.post('/', this.userController.create);
    this.router.put('/:id', this.userController.update);
    this.router.delete('/:id', this.userController.delete);
  }
}