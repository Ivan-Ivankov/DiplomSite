const User = require("../models/user");

exports.list = function (req, res, next) {
  const id = 0;
  User.selectAll((err, users) => {
    if (err) return next(err);
    res.render("admin_panel", {
      title: "Панель админа",
      admin_panel: users,
      id,
    });
  });
};

exports.removeUser = (req, res, next) => {
  const userid = req.params.id;
  console.log(userid);
  User.deleteUser(userid, (err) => {
    if (err) return next(err);
  });
  res.redirect("back");
};

exports.changeUser = (req, res, next) => {
  const userId = req.params.id;
  const data = req.body.user;
  User.change(userId, data, (err) => {
    if (err) return next(err);
    res.redirect("back");
  });
};

exports.id = (req, res, next) => {
  const id = req.params.id;
  User.selectAll((err, users) => {
    if (err) return next(err);
    User.findByID(id, (err, user) => {
      if (err) return cb(err);
      if (!user) return cb();
      res.render("admin_panel", {
        title: "Панель админа",
        admin_panel: users,
        user,
        id,
      });
    });
  });
};
