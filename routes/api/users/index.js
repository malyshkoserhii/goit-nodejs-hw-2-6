const express = require('express');
const router = express.Router();
// const validate = require('./validation');
const {
  userRegistrationController,
  userLoginController,
} = require('../../../controllers/user-controllers');

router.post('/auth/register', userRegistrationController);

router.post('/auth/login', userLoginController);

router.post('/auth/logout');

module.exports = router;
