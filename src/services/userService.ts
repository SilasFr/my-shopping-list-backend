import { User } from '@prisma/client';
import userRepository from '../repositories/useRepository.js';

interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export type PartialUser = Partial<User>;

export type InsertUser = Omit<User, 'id'>;

async function create({ name, email, password }: CreateUser) {
  const provider = null;
  const user = {
    name,
    email,
    password,
    provider,
  };
  return await userRepository.create(user);
}

async function find(user: PartialUser) {}

const userService = {
  create,
  find,
};

export default userService;
