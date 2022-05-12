import { User } from '@prisma/client';
import userRepository from '../repositories/useRepository.js';
import bcrypt from 'bcrypt';
import errorUtils from '../utils/errorUtils.js';

interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export type PartialUser = Partial<User>;

export type InsertUser = Omit<User, 'id'>;

async function create({ name, email, password }: CreateUser) {
  const provider = null;
  const encryptedPassword = bcrypt.hashSync(password, 10);

  const existingEmail = await userRepository.findByEmail(email);
  if (existingEmail) {
    throw errorUtils.forbiden('This email is already registered');
  }

  const user = {
    name,
    email,
    password: encryptedPassword,
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
