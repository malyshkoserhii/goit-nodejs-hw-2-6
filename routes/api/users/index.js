const express = require('express');
const router = express.Router();
// const validate = require('./validation');
const {
  userRegistrationController,
  userLoginController,
  userLogoutController,
} = require('../../../controllers/user-controllers');
const guard = require('../../../helpers/guard');

router.post('/auth/register', userRegistrationController);

router.post('/auth/login', userLoginController);

router.post('/auth/logout', guard, userLogoutController);

module.exports = router;
