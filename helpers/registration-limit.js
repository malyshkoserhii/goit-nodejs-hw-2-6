const rateLimit = require('express-rate-limit');
const { HttpCode } = require('../helpers/constants');

const userRegistrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  handler: (req, res, next) => {
    return res
      .status(HttpCode.BAD_REQEST)
      .json({ message: 'Too many requests, please try again later.' });
  },
});

module.exports = { userRegistrationLimiter };
