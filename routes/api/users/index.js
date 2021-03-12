const express = require('express');
const router = express.Router();
const {
  userRegistration,
  userLogin,
  userLogout,
  checkUserByToken,
  updateUserSubscription,
} = require('../../../controllers/user');
const guard = require('../../../helpers/guard');
const {
  userRegistrationValidation,
  userLoginValidation,
  userLogoutValidation,
  schemaUpdateSubscriptionValidation,
} = require('./validation');
const {
  userRegistrationLimiter,
} = require('../../../helpers/registration-limit');

router.post(
  '/auth/register',
  userRegistrationLimiter,
  userRegistrationValidation,
  userRegistration
);

router.post('/auth/login', userLoginValidation, userLogin);

router.post('/auth/logout', guard, userLogoutValidation, userLogout);

router.get('/current', guard, checkUserByToken);

router.patch(
  '/',
  guard,
  schemaUpdateSubscriptionValidation,
  updateUserSubscription
);

module.exports = router;
