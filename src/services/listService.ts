import listRepository, { InsertList } from '../repositories/listRepository.js';
import userRepository from '../repositories/useRepository.js';

async function find(userId: number, earlyReturn = false) {
  const usersLists = await listRepository.getListsIdByUser(userId);
  if (earlyReturn) return usersLists;
  let result = [];
  for (let i = 0; i < usersLists.length; i++) {
    const list = await getListsById(usersLists[i].listId);
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

async function remove(id: string) {
  await listRepository.deleteList(id);
  await listRepository.desassociateUser(id);
}

const listService = {
  find,
  create,
  findTemplate,
  remove,
};

export default listService;
