import { Router } from 'express';
import listController from '../controllers/listController.js';
import { validateToken } from '../middlewares/validateToken.js';

const listRouter = Router();

listRouter.post('/lists', validateToken, listController.create);
listRouter.get('/lists', validateToken, listController.get);
listRouter.get('/lists/template', validateToken, listController.getTemplate);

export default listRouter;
