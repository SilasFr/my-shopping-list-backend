import { Request, Response } from 'express';
import userService from '../services/userService.js';
import errorUtils from '../utils/errorUtils.js';

async function signup(req: Request, res: Response) {
  const user = req.body;

  await userService.create({ ...user });

  res.sendStatus(201);
}

async function login(req: Request, res: Response) {
  const user = req.body;

  const token = await userService.find(user);

  res.status(200).send(token);
}

async function validateUser(req: Request, res: Response) {
  const user = res.locals.user;
  delete user.password;

  res.status(200).send(user);
}

const userControler = {
  signup,
  login,
  validateUser,
};

export default userControler;
