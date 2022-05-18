import listRepository, { InsertList } from '../repositories/listRepository.js';
import userRepository from '../repositories/useRepository.js';

async function find(userId: number) {
  const usersLists = await listRepository.getListsIdByUser(userId);
  let result = [];
  for (let i = 0; i < usersLists.length; i++) {
    const list = await getListsById(usersLists[i].listId);
    console.log(list);
    result.push(list);
  }
  return result;
}

async function getListsById(listId: string) {
  return await listRepository.getListsById(listId);
}

async function create(list: InsertList, userId: number) {
  const insertedId = await listRepository.create(list);

  await listRepository.associateUser(userId, insertedId.toString());
  return;
}

async function findTemplate() {
  return await listRepository.getTemplate();
}

const listService = {
  find,
  create,
  findTemplate,
};

export default listService;
