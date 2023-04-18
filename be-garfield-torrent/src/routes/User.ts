import express, { Router } from 'express';
import { UserController } from '../controllers/User';


const userController = new UserController();
const router = express.Router();

router.get('/', userController.getAll);
router.get('/:userId', userController.getById);
router.post('/', userController.create);
router.put('/:userId', userController.update);
router.delete('/:userId', userController.delete);

export default router;

