import { Request, Response } from 'express';
import userService from '../services/userService.js';

async function signup(req: Request, res: Response) {
  const user = req.body;

  await userService.create({ ...user });

  res.sendStatus(201);
}

async function login(req: Request, res: Response) {}

const userControler = {
  signup,
  login,
};

export default userControler;
