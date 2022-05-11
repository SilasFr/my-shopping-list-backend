import pg from '@prisma/client';

const { PrismaClient } = pg;

const prisma = new PrismaClient();

export default prisma;
