import { Router } from 'express';
import userControler from '../controllers/userController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { validateToken } from '../middlewares/validateToken.js';
import userSchema from '../schemas/userSchema.js';

const userRouter = Router();

userRouter.post('/sign-up', validateSchema(userSchema), userControler.signup);
userRouter.post('/sign-in', userControler.login);
userRouter.post('/users/validate', validateToken, userControler.validateUser);

export default userRouter;
