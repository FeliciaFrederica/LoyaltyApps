const userAuth = require('./user-middleware');

function adminOnly(req, res, next) {
  userAuth(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Forbidden',
      });
    }
    return next();
  });
}

module.exports = adminOnly;
