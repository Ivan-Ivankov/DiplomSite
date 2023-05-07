const User = require("../models/user");

const id = 0;
const reg = false;

exports.list = function (req, res, next) {
  User.selectAll((err, users) => {
    if (err) return next(err);
    res.render("admin_panel", {
      title: "Панель админа",
      admin_panel: users,
      reg: reg,
      id: id,
    });
  });
};

exports.removeUser = (req, res, next) => {
  const userid = req.params.id;
  console.log(userid);
  User.deleteUser(userid, (err) => {
    if (err) return next(err);
  });
  res.redirect("/back");
};

exports.changeUser = (req, res, next) => {
  const userId = req.params.id;
  const data = req.body.user;
  User.change(userId, data, (err) => {
    if (err) return next(err);
    res.redirect("/admin-panel");
  });
};

exports.id = (req, res, next) => {
  const id = req.params.id;
  User.selectAll((err, users) => {
    if (err) return next(err);
    User.findByID(id, (err, user) => {
      if (err) return next(err);
      if (!user) return next();
      res.render("admin_panel", {
        title: "Панель админа",
        admin_panel: users,
        reg: reg,
        user: user,
        id: id,
      });
    });
  });
};

exports.reg = (req, res, next) => {
  const reg = true;
  User.selectAll((err, users) => {
    if (err) return next(err);
    res.render("admin_panel", {
      title: "Панель админа",
      admin_panel: users,
      reg: reg,
      id: id,
    });
  });
};
