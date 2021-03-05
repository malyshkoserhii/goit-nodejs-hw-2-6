const User = require('./schemas/user-schema');

const createUser = async ({ email, password, subscription }) => {
  const user = new User({ email, password, subscription });
  return await user.save();
};

const findUserById = async (userId) => {
  return await User.findById(userId);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const updateToken = async (userId, token) => {
  return await User.findByIdAndUpdate(userId, { token });
};

module.exports = {
  createUser,
  findUserById,
  findByEmail,
  updateToken,
};
