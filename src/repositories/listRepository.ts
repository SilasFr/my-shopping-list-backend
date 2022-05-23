import { ObjectId } from 'mongodb';
import { db } from '../database.js';
import fs from 'fs';
import prisma from '../database.js';

export type Category =
  | 'pets'
  | 'drugstore'
  | 'toys'
  | 'groceries'
  | 'cleaning'
  | 'electronics';

export interface Item {
  product: string;
  price: number;
  qty: number;
  category: Category;
}

export interface List {
  id: string;
  frequency: string;
  items: Item[];
}

export type InsertList = Omit<List, 'id'>;

async function getListsIdByUser(userId: number) {
  return prisma.list.findMany({ where: { userId } });
}

async function getListsById(listId: string) {
  return await db.collection('lists').findOne({ _id: new ObjectId(listId) });
}

async function getTemplate() {
  const templateId = '628b8b1dc45f4416a0faa5d3';
  const result = await db
    .collection('lists')
    .findOne({ _id: new ObjectId(templateId) });
  return result;
}

export async function generateTemplate() {
  const listItems = JSON.parse(
    fs.readFileSync(
      '/home/silas/Projects_driven/projeto-autoral/my-shopping-list-backend/src/repositories/template.json',
      'utf-8'
    )
  );
  const frequency: string = 'monthly';
  return await db
    .collection('lists')
    .insertOne({ frequency, items: listItems });
}

async function create(list: InsertList) {
  const { insertedId } = await db.collection('lists').insertOne(list);
  return insertedId;
}

async function associateUser(userId: number, listId: string) {
  return await prisma.list.create({ data: { listId, userId } });
}

async function deleteList(id: string) {
  return await db.collection('lists').deleteOne({ _id: new ObjectId(id) });
}

async function desassociateUser(listId: string) {
  return await prisma.list.delete({ where: { listId } });
}

const listRepository = {
  getTemplate,
  generateTemplate,
  getListsIdByUser,
  getListsById,
  create,
  deleteList,
  desassociateUser,
  associateUser,
};

export default listRepository;
