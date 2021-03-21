const express = require('express');
const router = express.Router();
const {
  userRegistration,
  userLogin,
  userLogout,
  checkUserByToken,
  updateUserSubscription,
  avatars,
  verification,
} = require('../../../controllers/user');
const guard = require('../../../helpers/guard');
const {
  userRegistrationValidation,
  userLoginValidation,
  userLogoutValidation,
  schemaUpdateSubscriptionValidation,
  uploadAvatarValidation,
} = require('./validation');
const {
  userRegistrationLimiter,
} = require('../../../helpers/registration-limit');
const upload = require('../../../helpers/upload');

router.post(
  '/auth/register',
  userRegistrationLimiter,
  userRegistrationValidation,
  userRegistration,
);

router.post('/auth/login', userLoginValidation, userLogin);

router.post('/auth/logout', guard, userLogoutValidation, userLogout);

router.get('/current', guard, checkUserByToken);

router.patch(
  '/',
  guard,
  schemaUpdateSubscriptionValidation,
  updateUserSubscription,
);

router.patch(
  '/avatars',
  guard,
  upload.single('avatar'),
  uploadAvatarValidation,
  avatars,
);

router.get('/auth/verify/:verificationToken', verification);

module.exports = router;
