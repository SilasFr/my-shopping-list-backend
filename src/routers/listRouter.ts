import { Router } from 'express';
import listController from '../controllers/listController.js';

const listRouter = Router();

listRouter.post('/list', listController.create);
listRouter.get('/list', listController.get);

export default listRouter;
