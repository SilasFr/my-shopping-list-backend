import { ObjectId } from 'mongodb';
import { db } from '../database.js';
import fs from 'fs';

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

async function getListsByUser() {}

async function getTemplate() {
  const result = await db
    .collection('lists')
    .findOne({ _id: new ObjectId('627de05b1d1b99d553ec3143') });
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
  getListsByUser,
};

export default listRepository;
