import { Router } from 'express';
import userRoutes from './routes/UserRoutes';
import authRoutes from './routes/AuthRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;