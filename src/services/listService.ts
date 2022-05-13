import listRepository from '../repositories/listRepository.js';

async function find() {
  return await listRepository.getTemplate();
}

async function create() {
  return await listRepository.generateTemplate();
}

const listService = {
  find,
  create,
};

export default listService;
