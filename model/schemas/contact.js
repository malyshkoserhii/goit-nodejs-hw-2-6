const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
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
    subscription: {
      type: String,
      enum: ['free', 'pro', 'premium'],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.plugin(mongoosePaginate);
const Contact = model('contact', contactSchema);

module.exports = Contact;
