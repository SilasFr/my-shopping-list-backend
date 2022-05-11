import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import errorUtils from '../utils/errorUtils.js';

export function validateSchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      throw errorUtils.schemaError(error.details[0].toString());
    }

    next();
  };
}
