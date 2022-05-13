import prisma from '../database.js';
import { InsertSession, InsertUser } from '../services/userService.js';

async function create(user: InsertUser) {
  return await prisma.user.create({ data: { ...user } });
}

async function findByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

async function createSession(sessionData: InsertSession) {
  return await prisma.session.create({ data: { ...sessionData } });
}

const userRepository = {
  create,
  findByEmail,
  createSession,
};

export default userRepository;
