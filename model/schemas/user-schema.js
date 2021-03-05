const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const {
  Subscription,
  regexpForEmailValidation,
} = require('../../helpers/constants');
require('dotenv').config();

const SALT = process.env.SALT;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required! Please enter your email'],
      minlenght: 5,
      unique: true,
      validate: {
        validator(value) {
          return regexpForEmailValidation.test(String(value).toLowerCase());
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required! Please enter your password'],
      minlenght: 5,
    },
    subscription: {
      type: String,
      enum: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
      default: Subscription.FREE,
    },
    token: { type: String },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSaltSync(SALT);
  this.password = await bcrypt.hash(this.password, salt, null);
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;
