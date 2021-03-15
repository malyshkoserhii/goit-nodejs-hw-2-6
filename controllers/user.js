const fs = require('fs').promises;
const path = require('path');
const Jimp = require('jimp');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Users = require('../model/users');
const { HttpCode } = require('../helpers/constants');
const createFolder = require('../helpers/create-dir');
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
          avatarURL: newUser.avatarURL,
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

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
    const pathFile = req.file.path;
    const newNameAvatar = `${Date.now()}-${req.file.originalname}`;
    const image = await Jimp.read(pathFile);
    await image
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(pathFile);
    await createFolder(path.join(AVATARS_OF_USERS, 'images'));
    await fs.rename(
      pathFile,
      path.join(AVATARS_OF_USERS, 'images', newNameAvatar)
    );
    const avatarUrl = path.normalize(path.join(newNameAvatar));
    try {
      await fs.unlink(
        path.join(process.cwd(), AVATARS_OF_USERS, 'images', req.user.avatarURL)
      );
    } catch (error) {
      console.log(error.message);
    }
    await Users.updateAvatar(id, avatarUrl);

    if (!req.user) {
      return res
        .status(HttpCode.UNAUTHORIZED)
        .type('application/json')
        .json({ message: 'Not authorized' });
    }

    return res.status(HttpCode.OK).type('application/json').json({ avatarUrl });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userRegistration,
  userLogin,
  userLogout,
  checkUserByToken,
  updateUserSubscription,
  avatars,
};
