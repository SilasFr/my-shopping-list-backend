import GeneratedError from '../middlewares/errorHandler.js';

function schemaError(message: string): GeneratedError {
  return { type: 'schema_error', message };
}

function notFound(message: string): GeneratedError {
  return { type: 'not_found', message };
}

function forbiden(message: string): GeneratedError {
  return { type: 'forbiden', message };
}

function unauthorized(message: string): GeneratedError {
  return { type: 'unauthorized', message };
}

const errorUtils = { schemaError, notFound, forbiden, unauthorized };

export default errorUtils;
