const Contact = require('../model');

const addContactController = async (req, res, next) => {
  try {
    const contact = await Contact.addContact(req.body);
    if (!contact) {
      return res.status(400).json({ message: 'missing required name field' });
    }
    return res.status(201).json({ contact });
  } catch (error) {
    next(error);
  }
};

const getAllContactsController = async (req, res, next) => {
  try {
    const contacts = await Contact.listContacts();
    return res.json({ contacts });
  } catch (error) {
    next(error);
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const contacts = await Contact.getContactById(req.params.contactId);
    return res.json({ contacts });
  } catch (error) {
    next(error);
  }
};

const updateContactController = async (req, res, next) => {
  try {
    const contact = await Contact.updateContact(req.params.contactId, req.body);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json({ contact });
  } catch (error) {
    next(error);
  }
};

const removeContactController = async (req, res, next) => {
  try {
    const contact = await Contact.removeContact(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
  removeContactController,
};
