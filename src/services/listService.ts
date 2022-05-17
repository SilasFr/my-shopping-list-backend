import listRepository from '../repositories/listRepository.js';

async function find(userId: number) {
  const usersLists = await listRepository.getListsIdByUser(userId);
  const lists = await usersLists.map(async (list) => {
    return await listRepository.getListsById(list.listId);
  });
  return lists;
}

async function create() {
  return await listRepository.generateTemplate();
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
