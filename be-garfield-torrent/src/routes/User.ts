import express, { Router } from 'express';
import { UserController } from '../controllers/User';


const userController = new UserController();
const router = express.Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;

