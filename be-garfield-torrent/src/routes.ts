import { Router } from 'express';
import userRoutes from './routes/UserRoutes';
import authRoutes from './routes/AuthRoutes';

const router = Router();

router.use('/api/users', userRoutes);
router.use('/api/auth', authRoutes);

export default router;