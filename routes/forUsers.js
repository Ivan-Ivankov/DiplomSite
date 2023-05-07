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
  if (page === "news") {
    forUsersUwU.newsList((err, news) => {
      if (err) return next(err);
      res.render("forUsers", {
        title: "Для сотрудников",
        news: news,
        page: page,
        id: id,
      });
    });
  }
  if (page === "documents") {
    const page = req.params.page;
    res.render("forUsers", {
      title: "Для сотрудников",
      page: page,
    });
  }

  if (page === "chat") {
    const page = req.params.page;
    res.render("forUsers", {
      title: "Для сотрудников",
      page: page,
    });
  }
};
