import pg from '@prisma/client';
import { Db, MongoClient } from 'mongodb';

const { PrismaClient } = pg;

const prisma = new PrismaClient();

const mongoClient = new MongoClient('mongodb://mongo:27017');
export let db: Db;

mongoClient.connect().then(() => {
  db = mongoClient.db('shopping-list');
});

export default prisma;
