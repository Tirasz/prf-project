import { Router } from 'express';
import userRoutes from './routes/User';
import authRoutes from './routes/Auth';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;