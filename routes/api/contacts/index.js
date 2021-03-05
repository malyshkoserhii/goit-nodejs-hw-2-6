const express = require('express');
const router = express.Router();
const {
  createUserValidation,
  getByIdUserValidation,
  updateUserValidation,
  removeUserValidation,
} = require('./validation');
const {
  addContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
  removeContactController,
} = require('../../../controllers/contacts-controller');
const guard = require('../../../helpers/guard');

router.post('/', guard, createUserValidation, addContactController);

router.get('/', guard, getAllContactsController);

router.get(
  '/:contactId',
  guard,
  getByIdUserValidation,
  getContactByIdController
);

router.patch(
  '/:contactId',
  guard,
  updateUserValidation,
  updateContactController
);

router.delete(
  '/:contactId',
  guard,
  removeUserValidation,
  removeContactController
);

module.exports = router;
