import { User } from '@prisma/client';
import { Request, Response } from 'express';
import listRepository from '../repositories/listRepository.js';
import listService from '../services/listService.js';
import errorUtils from '../utils/errorUtils.js';

async function get(req: Request, res: Response) {
  const user: User = res.locals.user;
  const result = await listService.find(user.id);
  res.status(200).send(result);
}

async function getTemplate(req: Request, res: Response) {
  const result = await listService.findTemplate();
  res.status(200).send(result);
}

async function create(req: Request, res: Response) {
  const user = res.locals.user;
  const list = req.body;
  await listService.create(list, user.id);

  res.sendStatus(201);
}

async function createTemplate(req: Request, res: Response) {
  const id = await listRepository.generateTemplate();
  res.status(201).send(id);
}

async function deleteList(req: Request, res: Response) {
  const user = res.locals.user;
  const listId: string = req.params?.id;

  const usersLists = await listService.find(user.id, true);
  const list = usersLists.find((el) => el.listId === listId);
  if (!list) {
    throw errorUtils.notFound('List not found for this user');
  }

  await listService.remove(listId);
  res.sendStatus(204);
}

const listController = {
  get,
  create,
  getTemplate,
  createTemplate,
  deleteList,
};

export default listController;
