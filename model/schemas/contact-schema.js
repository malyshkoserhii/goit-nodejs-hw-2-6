const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Enter the name'],
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      unique: true,
      minLength: 5,
      maxLength: 35,
    },
    phone: {
      type: String,
      required: [true, 'Enter the phone number'],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model('contact', contactSchema);

module.exports = Contact;
