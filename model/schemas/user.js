const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const {
  Subscription,
  regexpForEmailValidation,
} = require('../../helpers/constants');
require('dotenv').config();

const BCRYPT_SALT = Number(process.env.SALT);

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required! Please enter your email'],
      minlength: 5,
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
      minlength: 5,
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: 250 }, true);
      },
    },
    subscription: {
      type: String,
      enum: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
      default: Subscription.FREE,
    },
    token: { type: String },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Veryfication token is required!'],
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(BCRYPT_SALT);
  this.password = await bcrypt.hash(this.password, salt, null);
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;
