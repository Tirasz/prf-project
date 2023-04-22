import express from 'express';
import { authGuard, isOwnerGuard, isOwnerOrAdmin } from '../services/AuthGuards';
import { TorrentController } from '../controllers/TorrentController';


const torrentController = new TorrentController();
const router = express.Router();

router.get('/', torrentController.getAll);
router.get('/:torrentId', torrentController.getById);

router.post('/', authGuard, torrentController.create);
router.put('/:torrentId', authGuard, isOwnerGuard, torrentController.update);
router.delete('/:torrentId', authGuard, isOwnerOrAdmin, torrentController.delete);

export default router;

