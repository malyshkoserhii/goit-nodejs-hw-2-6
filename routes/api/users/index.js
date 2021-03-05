const express = require('express');
const router = express.Router();
const validate = require('./validation');
const {
  userRegistrationController,
} = require('../../../controllers/user-controllers');

router.post('/auth/register', userRegistrationController);
router.post('/auth/login');
router.post('/auth/logiut');

module.exports = router;
