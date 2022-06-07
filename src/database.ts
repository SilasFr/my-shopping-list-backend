import pg from '@prisma/client';
import { Db, MongoClient } from 'mongodb';

const { PrismaClient } = pg;

const prisma = new PrismaClient();

const mongoClient = new MongoClient(
  'mongodb+srv://shopping-list-admin:g8eYYHbwQ9unTMy0@cluster0.znct4.mongodb.net/?retryWrites=true&w=majority'
);
export let db: Db;

mongoClient.connect().then(() => {
  db = mongoClient.db('shopping-list');
});

export default prisma;
