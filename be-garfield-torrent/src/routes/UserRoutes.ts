import express from 'express';
import { UserController } from '../controllers/UserController';
import { authGuard, isAdminOrSelf, isSelf } from '../services/AuthGuards';


const userController = new UserController();
const router = express.Router();

router.get('/', userController.getAll);
router.get('/:userId', userController.getById);
router.post('/', userController.create);

router.put('/:userId', authGuard, isSelf, userController.update);
router.delete('/:userId', authGuard, isAdminOrSelf, userController.delete);

export default router;

