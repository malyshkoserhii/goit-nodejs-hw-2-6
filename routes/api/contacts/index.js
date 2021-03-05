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

router.post('/', createUserValidation, addContactController);

router.get('/', getAllContactsController);

router.get('/:contactId', getByIdUserValidation, getContactByIdController);

router.patch('/:contactId', updateUserValidation, updateContactController);

router.delete('/:contactId', removeUserValidation, removeContactController);

module.exports = router;
