const User = require('./schemas/user');

const createUser = async ({
  email,
  password,
  subscription,
  verification,
  verificationToken,
}) => {
  const user = new User({
    email,
    password,
    subscription,
    verification,
    verificationToken,
  });
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

const updateUserSubscription = async (userId, subscription) => {
  try {
    const updateSubscription = await User.findByIdAndUpdate(
      { _id: userId },
      { subscription },
      { new: true },
    );
    return updateSubscription;
  } catch (error) {
    console.log(error);
  }
};

const updateAvatar = async (userId, avatarURL) => {
  return await User.findByIdAndUpdate(userId, { avatarURL });
};

const findByVerificationToken = async (verificationToken) => {
  return await User.findOne({ verificationToken });
};

const updateVerificationToken = async (
  userId,
  verification,
  verificationToken,
) => {
  return await User.findByIdAndUpdate(
    { _id: userId },
    { verification, verificationToken },
  );
};

module.exports = {
  createUser,
  findUserById,
  findByEmail,
  updateToken,
  updateUserSubscription,
  updateAvatar,
  findByVerificationToken,
  updateVerificationToken,
};
