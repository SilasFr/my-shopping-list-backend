import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

interface GeneratedError {
  message: string;
  type: string;
}

export function errorHandlerMiddleware(
  error: GeneratedError | Joi.ValidationErrorItem,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if ((error.type = 'schema_error')) {
    res.status(400).send(error.message);
  }
  res.status(500).send(error);
}

export default GeneratedError;