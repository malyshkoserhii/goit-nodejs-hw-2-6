const passport = require('passport');
require('../config/passport-jwt');
const { HttpCode } = require('./constants');

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    const [, token] = req.get('Authorization').split(' ');
    if (!user || error || token !== user.token) {
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
