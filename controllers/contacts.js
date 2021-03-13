const Contact = require('../model/contacts');
const { HttpCode } = require('../helpers/constants');

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contact.addContact({ ...req.body, owner: userId });
    if (!contact) {
      return res
        .status(HttpCode.BAD_REQEST)
        .json({ message: 'missing required name field' });
    }
    return res.status(HttpCode.CREATED).json({ contact });
  } catch (error) {
    next(error);
  }
};

const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await Contact.listContacts(userId, req.query);
    return res.status(HttpCode.OK).json({ ...contacts });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await Contact.getContactById(req.params.contactId, userId);
    return res.status(HttpCode.OK).json({ contacts });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contact.updateContact(
      req.params.contactId,
      req.body,
      userId
    );
    if (!contact) {
      return res.status(HttpCode.BAD_REQEST).json({ message: 'Not found' });
    }
    return res.status(HttpCode.OK).json({ contact });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contact.removeContact(req.params.contactId, userId);
    if (!contact) {
      return res.status(HttpCode.BAD_REQEST).json({ message: 'Not found' });
    }
    return res.status(HttpCode.OK).json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addContact,
  getAllContacts,
  getContactById,
  updateContact,
  removeContact,
};
