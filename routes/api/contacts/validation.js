const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const schemaCreateUser = Joi.object({
  id: Joi.objectId(),
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'uk'] },
    })
    .optional(),
  phone: Joi.string().required(),
  subscription: Joi.string().optional(),
});

const schemaGetById = Joi.object({
  id: Joi.objectId(),
});

const schemaUpdateUser = Joi.object({
  id: Joi.objectId(),
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'uk'] },
    })
    .optional(),
  phone: Joi.string().optional(),
  subscription: Joi.string().default('free').optional(),
}).min(1);

const schemaDelete = Joi.object({
  id: Joi.objectId(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const message = error.details[0].message;
    return next({
      status: 400,
      message: `Field ${message.replace(/"/g, '')}`,
    });
  }
  next();
};

const createUserValidation = (req, res, next) => {
  return validate(schemaCreateUser, req.body, next);
};

const getByIdUserValidation = (req, res, next) => {
  return validate(schemaGetById, req.body, next);
};

const updateUserValidation = (req, res, next) => {
  return validate(schemaUpdateUser, req.body, next);
};

const removeUserValidation = (req, res, next) => {
  return validate(schemaDelete, req.body, next);
};

module.exports = {
  createUserValidation,
  getByIdUserValidation,
  updateUserValidation,
  removeUserValidation,
};
