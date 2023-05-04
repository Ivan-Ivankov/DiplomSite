const User = require("../models/user");

exports.form = (req, res) => {
  res.render("login", { title: "Авторизация" });
};

exports.submit = (req, res, next) => {
  const data = req.body.user;
  User.authentificate(data.name, data.password, (err, user) => {
    if (err) return next(err);
    if (user) {
      req.session.uname = user.name;
      res.redirect("/");
    } else {
      res.error("Логин или Пароль не верный");
      res.redirect("back");
    }
  });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
};
