const express = require('express');
const router = express.Router();
const {
  userRegistrationController,
  userLoginController,
  userLogoutController,
  checkUserByTokenController,
} = require('../../../controllers/user-controllers');
const guard = require('../../../helpers/guard');
const {
  userRegistrationValidation,
  userLoginValidation,
  userLogoutValidation,
} = require('./validation');
const {
  userRegistrationLimiter,
} = require('../../../helpers/registration-limit');

router.post(
  '/auth/register',
  userRegistrationLimiter,
  userRegistrationValidation,
  userRegistrationController
);

router.post('/auth/login', userLoginValidation, userLoginController);

router.post('/auth/logout', guard, userLogoutValidation, userLogoutController);

router.get('/current', checkUserByTokenController);

module.exports = router;
