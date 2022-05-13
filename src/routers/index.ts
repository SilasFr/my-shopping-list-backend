import { Router } from 'express';
import listRouter from './listRouter.js';
import userRouter from './userRouter.js';

const router = Router();

router.use(userRouter);
router.use(listRouter);

export default router;
