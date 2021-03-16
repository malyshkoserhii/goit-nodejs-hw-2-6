const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { HttpCode } = require('../../../helpers/constants');

const schemaUserRegistration = Joi.object({
  id: Joi.objectId(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua'] },
    })
    .optional(),
  password: Joi.string().required().min(8).max(30),
  subscriprion: Joi.string().optional(),
});

const schemaUserLogin = Joi.object({
  id: Joi.objectId(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua'] },
    })
    .optional(),
  password: Joi.string().required().min(8).max(30),
  subscriprion: Joi.string().valid('free', 'pro', 'premium').optional(),
});

const schemaUserLogout = Joi.object({
  id: Joi.objectId(),
});

const schemaUpdateSubscription = Joi.object({
  subscription: Joi.string().valid('free', 'pro', 'premium').required(),
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

const userRegistrationValidation = (req, res, next) => {
  return validate(schemaUserRegistration, req.body, next);
};

const userLoginValidation = (req, res, next) => {
  return validate(schemaUserLogin, req.body, next);
};

const userLogoutValidation = (req, res, next) => {
  return validate(schemaUserLogout, req.body, next);
};

const schemaUpdateSubscriptionValidation = (req, res, next) => {
  return validate(schemaUpdateSubscription, req.body, next);
};

const uploadAvatarValidation = (req, res, next) => {
  if (!req.file) {
    return res
      .status(HttpCode.BAD_REQEST)
      .json({ message: 'Please choose the file to upload' });
  }
  next();
};

module.exports = {
  userRegistrationValidation,
  userLoginValidation,
  userLogoutValidation,
  schemaUpdateSubscriptionValidation,
  uploadAvatarValidation,
};
