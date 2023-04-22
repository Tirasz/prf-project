import { Router } from 'express';
import userRoutes from './routes/UserRoutes';
import authRoutes from './routes/AuthRoutes';
import torrentRoutes from './routes/TorrentRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/torrents', torrentRoutes)

export default router;