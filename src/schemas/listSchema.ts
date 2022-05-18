import Joi from 'joi';

const itemsSchema = Joi.object({
  product: Joi.string().required(),
  price: Joi.number().integer().required(),
  qty: Joi.number().integer().required(),
  category: Joi.string().required(),
});

const listSchema = Joi.object({
  frequency: Joi.string().required(),
  items: Joi.array().items(itemsSchema).required(),
});

export default listSchema;
