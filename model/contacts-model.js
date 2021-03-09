const Contact = require('./schemas/contact-schema');

const addContact = async (body) => {
  try {
    const result = await Contact.create(body);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const listContacts = async (userId, { page = '1', limit = '5', filter }) => {
  try {
    const results = await Contact.paginate(
      { owner: userId },
      {
        page,
        limit,
        populate: {
          path: 'owner',
          select: 'email subscription',
        },
      }
    );
    const {
      docs: contacts,
      totalDocs: total,
      page: pageNumber,
      totalPages: allPages,
    } = results;
    return {
      total: total.toString(),
      limit,
      totalPages: allPages.toString(),
      page: pageNumber.toString(),
      contacts,
    };
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId, userId) => {
  try {
    const result = await Contact.findById({
      _id: contactId,
      owner: userId,
    }).populate({
      path: 'owner',
      select: 'email subscription',
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body, userId) => {
  try {
    const result = await Contact.findByIdAndUpdate(
      { _id: contactId, owner: userId },
      { ...body },
      { new: true }
    ).populate({
      path: 'owner',
      select: 'email subscription',
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId, userId) => {
  try {
    const result = await Contact.findByIdAndRemove({
      _id: contactId,
      owner: userId,
    }).populate({
      path: 'owner',
      select: 'email subscription',
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
