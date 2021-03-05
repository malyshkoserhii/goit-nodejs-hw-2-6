const jwt = require('jsonwebtoken');
require('dotenv').config();
const Users = require('../model/users-model');
const { HttpCode } = require('../helpers/constants');

const SECRET_KEY = process.env.JWT_SECRET;

const userRegistrationController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Users.findByEmail(email);

    if (user) {
      return res
        .status(HttpCode.CONFLICT)
        .type('application/json')
        .json({ message: 'Email in use' });
    }

    const newUser = await Users.createUser(req.body);
    if (!newUser) {
      return res
        .status(HttpCode.BAD_REQEST)
        .type('application/json')
        .json({ message: 'missing required field' });
    }

    return res
      .status(HttpCode.CREATED)
      .type('application/json')
      .json({
        status: 'success',
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        },
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userRegistrationController,
};
