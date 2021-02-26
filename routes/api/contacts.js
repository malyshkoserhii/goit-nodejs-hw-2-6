const express = require('express');
const router = express.Router();
const { createUserValidation, updateUserValidation } = require('./validation');
const {
  addContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
  removeContactController,
} = require('../../controllers/contacts-controller');

router.post('/', createUserValidation, addContactController);

router.get('/', getAllContactsController);

router.get('/:contactId', getContactByIdController);

router.patch('/:contactId', updateUserValidation, updateContactController);

router.delete('/:contactId', removeContactController);

module.exports = router;
