import { User } from '@prisma/client';
import userRepository from '../repositories/useRepository.js';
import bcrypt from 'bcrypt';
import errorUtils from '../utils/errorUtils.js';
import { Session } from '@prisma/client';
import { v4 as uuid } from 'uuid';

interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export type PartialUser = Partial<User>;

export type InsertUser = Omit<User, 'id'>;

export type InsertSession = Omit<Session, 'id'>;

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

async function find(user: PartialUser) {
  const { email, password } = user;
  const existingUser = await verifyEmail();

  verifyPassword();

  const token = await generateSession();

  async function generateSession() {
    const token: string = uuid();
    const userId = existingUser.id;

    await userRepository.createSession({ token, userId });

    return token;
  }

  function verifyPassword() {
    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordValid) {
      throw errorUtils.forbiden('Invalid password');
    }
  }

  async function verifyEmail() {
    const existingUser = await userRepository.findByEmail(email);
    if (!existingUser) {
      throw errorUtils.forbiden('User not registered');
    }
    return existingUser;
  }

  return token;
}

async function findByToken(token: string) {
  const { userId } = await userRepository.findByToken(token);
  if (!userId) {
    throw 'Invalid token';
  }

  const user = await userRepository.findById(userId);
  return user;
}

const userService = {
  create,
  find,
  findByToken,
};

export default userService;
