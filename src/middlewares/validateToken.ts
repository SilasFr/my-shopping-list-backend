import { NextFunction, Request, Response } from 'express';
import userService from '../services/userService.js';
import errorUtils from '../utils/errorUtils.js';

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers['authorization'];
  if (!authorization) {
    throw errorUtils.unauthorized('Missing authentication header');
  }

  const token = authorization.replace(`Bearer `, '');
  if (!token) {
    throw errorUtils.unauthorized('Invalid token');
  }

  try {
    const user = await userService.findByToken(token);
    res.locals.user = user;
    next();
  } catch {
    throw errorUtils.unauthorized('Invalid token');
  }
}
