import { Request, Response } from 'express';
import listService from '../services/listService.js';

async function get(req: Request, res: Response) {
  const result = await listService.find();
  const filtered = JSON.stringify(result);
  const response = JSON.parse(filtered);
  res.status(200).send(response);
}

async function create(req: Request, res: Response) {
  await listService.create();
  res.sendStatus(201);
}

const listController = {
  get,
  create,
};

export default listController;
