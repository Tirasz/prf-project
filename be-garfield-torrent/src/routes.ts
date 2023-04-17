import { Router } from 'express';
import { UserRoutes } from './routes/User';


const router = Router();

router.use('/users', new UserRoutes().router);


export default router;