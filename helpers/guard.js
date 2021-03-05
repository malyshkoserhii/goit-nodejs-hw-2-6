const passport = require('passport');
require('../config/passport-jwt');
const { HttpCode } = require('./constants');

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (!user || error) {
      return res
        .status(HttpCode.UNAUTHORIZED)
        .type('application/json')
        .json({ message: 'Not authorized' });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
