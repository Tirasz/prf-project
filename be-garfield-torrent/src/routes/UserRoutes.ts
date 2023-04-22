import express from 'express';
import { UserController } from '../controllers/UserController';
import { authGuard, isAdminGuard, isAdminOrSelf, isSelf } from '../services/AuthGuards';


const userController = new UserController();
const router = express.Router();

router.get('/', userController.getAll);
router.get('/:userId', userController.getById);
router.post('/', userController.create);

router.put('/:userId', authGuard, isSelf, userController.update);
router.delete('/:userId', authGuard, isAdminOrSelf, userController.delete);
router.put('/promote/:userId', authGuard, isAdminGuard, userController.promote);

export default router;

