const express = require('express');
const router = express.Router();
const {
  userRegistrationController,
  userLoginController,
  userLogoutController,
} = require('../../../controllers/user-controllers');
const guard = require('../../../helpers/guard');
const {
  userRegistrationValidation,
  userLoginValidation,
  userLogoutValidation,
} = require('./validation');

router.post(
  '/auth/register',
  userRegistrationValidation,
  userRegistrationController
);

router.post('/auth/login', userLoginValidation, userLoginController);

router.post('/auth/logout', guard, userLogoutValidation, userLogoutController);

module.exports = router;
