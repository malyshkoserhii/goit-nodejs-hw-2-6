const express = require('express');
const router = express.Router();
const {
  createUserValidation,
  getByIdUserValidation,
  updateUserValidation,
  removeUserValidation,
} = require('./validation');
const {
  addContact,
  getAllContacts,
  getContactById,
  updateContact,
  removeContact,
} = require('../../../controllers/contacts');
const guard = require('../../../helpers/guard');

router.post('/', guard, createUserValidation, addContact);

router.get('/', guard, getAllContacts);

router.get('/:contactId', guard, getByIdUserValidation, getContactById);

router.patch('/:contactId', guard, updateUserValidation, updateContact);

router.delete('/:contactId', guard, removeUserValidation, removeContact);

module.exports = router;
