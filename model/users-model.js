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

const checkUserByToken = async (token) => {
  return await User.findOne({ token });
};

const updateUserSubscription = async (userId, subscription) => {
  try {
    const updateSubscription = await User.findByIdAndUpdate(
      { _id: userId },
      { subscription },
      { new: true }
    );
    return updateSubscription;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  findUserById,
  findByEmail,
  updateToken,
  checkUserByToken,
  updateUserSubscription,
};
