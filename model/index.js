const db = require('./db');
const { ObjectID } = require('mongodb');

const getCollection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);

  return collection;
};

const addContact = async (body) => {
  try {
    const newContact = {
      ...body,
    };
    const collection = await getCollection(db, 'contacts');
    const {
      ops: [result],
    } = await collection.insertOne(newContact);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const listContacts = async () => {
  try {
    const collection = await getCollection(db, 'contacts');
    const results = await collection.find({}).toArray();
    return results;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const objectId = new ObjectID(contactId);
    const collection = await getCollection(db, 'contacts');
    const [result] = await collection.find({ _id: objectId }).toArray();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const objectId = new ObjectID(contactId);
    const collection = await getCollection(db, 'contacts');
    const { value: result } = await collection.findOneAndUpdate(
      { _id: objectId },
      { $set: body },
      { returnOriginal: false }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const objectId = new ObjectID(contactId);
    const collection = await getCollection(db, 'contacts');
    const result = await collection.findOneAndDelete({ _id: objectId });
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
