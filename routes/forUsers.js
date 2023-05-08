const User = require("../models/user");
const forUsersUwU = require("../models/forUsersUwU");

const id = 0;

exports.submit = (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  forUsersUwU.createNews(data, id, (err) => {
    if (err) return next(err);
    res.redirect("/forUsers/news");
  });
};

exports.submitForm = (req, res, next) => {
  const page = req.params.page;
  const id = req.params.id;
  forUsersUwU.newsList((err, news) => {
    if (err) return next(err);
    res.render("forUsers", {
      title: "Для сотрудников",
      news: news,
      page: page,
      id: id,
    });
  });
};

exports.removeNews = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  forUsersUwU.removeNews(id, (err) => {
    if (err) return next(err);
  });
  res.redirect("back");
};

exports.form = (req, res, next) => {
  const page = req.params.page;
  switch (page) {
    case "profile":
      const name = req.params.name;
      User.findByName(name, (err, user) => {
        if (err) return next(err);
        res.render("forUsers", {
          title: "Для сотрудников",
          user: user,
          page: page,
        });
      });
      break;
    case "documents":
      res.render("forUsers", {
        title: "Для сотрудников",
        page: page,
      });
      break;
    case "chat":
      res.render("forUsers", {
        title: "Для сотрудников",
        page: page,
      });
      break;
  }
};
