const passport = require('./authentication');

module.exports = passport.authenticate('jwt', { session: false });
