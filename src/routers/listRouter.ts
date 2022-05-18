import { Router } from 'express';
import listController from '../controllers/listController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { validateToken } from '../middlewares/validateToken.js';
import listSchema from '../schemas/listSchema.js';

const listRouter = Router();

listRouter.post(
  '/lists',
  validateToken,
  validateSchema(listSchema),
  listController.create
);
listRouter.get('/lists', validateToken, listController.get);
listRouter.get('/lists/template', validateToken, listController.getTemplate);

export default listRouter;
