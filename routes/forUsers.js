const User = require("../models/user");
const forUsersUwU = require("../models/forUsersUwU");

exports.submit = (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  forUsersUwU.createNews(data, id, (err) => {
    if (err) return next(err);
    res.redirect("/forUsers/news");
  });
};

exports.list = (req, res, next) => {
  forUsersUwU.newsList((err, news) => {
    if (err) return next(err);
    res.render("forUsers", {
      title: "Для сотрудников",
      news: news,
    });
  });
};
