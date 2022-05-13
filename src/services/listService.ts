import listRepository from '../repositories/listRepository.js';

async function find() {
  return await listRepository.getListsByUser();
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
