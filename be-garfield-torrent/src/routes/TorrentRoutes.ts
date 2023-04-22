import express from 'express';
import { authGuard } from '../services/AuthGuards';
import { TorrentController } from '../controllers/TorrentController';


const torrentController = new TorrentController();
const router = express.Router();

router.get('/', torrentController.getAll);
router.get('/:torrentId', torrentController.getById);

router.post('/', authGuard, torrentController.create);
router.put('/:torrentId', authGuard, torrentController.update); //TODO OwnerGuard
router.delete('/:torrentId', authGuard, torrentController.delete); //TODO isAdminOrOwner

export default router;

