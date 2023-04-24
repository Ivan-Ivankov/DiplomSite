const User = require("../models/user");

module.exports = (req, res, next) => {
  const uname = req.session.uname;
  if (!uname) return next();
  User.findByName(uname, (err, user) => {
    if (err) return next(err);
    if (user) {
      req.user = res.locals.user = user;
    }
    next();
  });
};
