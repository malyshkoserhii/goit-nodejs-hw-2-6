const jwt = require('jsonwebtoken');
const Users = require('../model/users');
const { HttpCode } = require('../helpers/constants');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;

const userRegistration = async (req, res, next) => {
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

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.validPassword(password);

    if (!user || !isValidPassword) {
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

const userLogout = async (req, res, next) => {
  const id = req.user.id;
  const user = await Users.findUserById(id);

  if (!user) {
    return res
      .status(HttpCode.UNAUTHORIZED)
      .type('application/json')
      .json({ message: 'Not authorized' });
  }

  await Users.updateToken(id, null);

  return res.status(HttpCode.NO_CONTENT).json({});
};

const checkUserByToken = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(HttpCode.UNAUTHORIZED)
        .type('application/json')
        .json({ message: 'Not authorized' });
    }

    return res
      .status(HttpCode.OK)
      .type('application/json')
      .json({ user: { email: user.email, subscription: user.subscription } });
  } catch (error) {
    console.log(error);
  }
};

const updateUserSubscription = async (req, res, next) => {
  try {
    const user = req.user;
    const id = user.id;
    const subscription = req.body.subscription;
    const newSubscription = await Users.updateUserSubscription(
      id,
      subscription
    );
    const updatedSubscritrion = newSubscription.subscription;

    if (!newSubscription) {
      return res
        .status(HttpCode.BAD_REQEST)
        .json({ message: 'Server could not update your subscription' });
    }
    return res
      .status(HttpCode.OK)
      .json({ user: { email: user.email, subscription: updatedSubscritrion } });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userRegistration,
  userLogin,
  userLogout,
  checkUserByToken,
  updateUserSubscription,
};
