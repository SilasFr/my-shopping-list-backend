import prisma from '../database.js';
import { InsertUser } from '../services/userService.js';

async function create(user: InsertUser) {
  return await prisma.user.create({ data: { ...user } });
}

async function findByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

const userRepository = {
  create,
  findByEmail,
};

export default userRepository;
