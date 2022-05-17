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

async function getListsIdByUser(userId: number) {
  return prisma.list.findMany({ where: { userId } });
}

async function getListsById(listId: string) {
  return await db.collection('lists').findOne({ _id: new ObjectId(listId) });
}

async function getTemplate() {
  const templateId = '627de05b1d1b99d553ec3143';
  const result = await db
    .collection('lists')
    .findOne({ _id: new ObjectId(templateId) });
  return result;
}

export async function generateTemplate() {
  const list = JSON.parse(
    fs.readFileSync(
      '/home/silas/Projects_driven/projeto-autoral/my-shopping-list-backend/src/repositories/template.json',
      'utf-8'
    )
  );
  return await db.collection('lists').insertOne({ list });
}

const listRepository = {
  getTemplate,
  generateTemplate,
  getListsIdByUser,
  getListsById,
};

export default listRepository;
