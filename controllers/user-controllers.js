const jwt = require('jsonwebtoken');
const Users = require('../model/users-model');
const { HttpCode } = require('../helpers/constants');
require('dotenv').config();
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
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        },
      });
  } catch (error) {
    next(error);
  }
};

const userLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);

    if (!user || !user.validPassword(password)) {
      return res
        .status(HttpCode.UNAUTHORIZED)
        .type('application/json')
        .json({ message: 'Email or password is wrong' });
    }

    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7 days' });
    await Users.updateToken(id, token);
    return res.status(HttpCode.OK).type('application/json').json({ token });
  } catch (error) {
    next(error);
  }
};

const userLogoutController = async (req, res, next) => {
  const id = req.user.id;
  // const user = await Users.findUserById(userId);
  await Users.updateToken(id, null);

  // if (!user) {
  //   return res
  //     .status(HttpCode.UNAUTHORIZED)
  //     .type('application/json')
  //     .json({ message: 'Not authorized' });
  // }

  return res.status(HttpCode.NO_CONTENT).json({});
};

module.exports = {
  userRegistrationController,
  userLoginController,
  userLogoutController,
};
