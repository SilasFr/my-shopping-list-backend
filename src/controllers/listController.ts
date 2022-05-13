import { User } from '@prisma/client';
import { Request, Response } from 'express';
import listService from '../services/listService.js';

async function get(req: Request, res: Response) {
  const user: User = res.locals.user;
  const result = await listService.find();
  res.status(200).send(result);
}

async function getTemplate(req: Request, res: Response) {
  const result = await listService.findTemplate();
  res.status(200).send(result);
}

async function create(req: Request, res: Response) {
  await listService.create();
  res.sendStatus(201);
}

const listController = {
  get,
  create,
  getTemplate,
};

export default listController;
