const User = require("../models/user");

exports.form = (req, res) => {
  res.render("register", { title: "Регистрация" });
};

exports.submit = (req, res, next) => {
  const data = req.body.user;
  User.findByName(data.name, (err, user) => {
    if (err) return next(err);
    if (user) {
      res.error("Такой пользователь в базе уже есть");
      res.redirect("/admin-panel/users/register");
    } else {
      User.create(data, (err, user) => {
        if (err) return next(err);
        // req.session.uname = data.name;
        res.redirect("/admin-panel/users");
      });
    }
  });
};
