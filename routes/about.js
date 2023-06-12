const User = require("../models/user");
const Documents = require("../models/documents");
const About = require("../models/about");

const id = null;
const news = null;

exports.submit = (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  About.createNews(data, id, (err) => {
    if (err) return next(err);
    res.redirect("/about/news");
  });
};

exports.submitForm = (req, res, next) => {
  const page = req.params.page;
  const id = req.params.id;
  About.newsList((err, news) => {
    if (err) return next(err);
    res.render("about", {
      title: "О компании",
      news: news,
      page: page,
      id: id,
    });
  });
};

exports.removeNews = (req, res, next) => {
  const id = req.params.id;
  About.removeNews(id, (err) => {
    if (err) return next(err);
  });
  res.redirect("/about/news");
};

exports.form = (req, res, next) => {
  const page = req.params.page;
  switch (page) {
    case "news":
      About.newsList((err, news) => {
        if (err) return next(err);
        res.render("about", {
          title: "О компании",
          news: news,
          page: page,
          id: id,
        });
      });
      break;
    case "company":
      res.render("about", {
        title: "О компании",
        page: page,
      });
      break;
    case "contacts":
      res.render("about", {
        title: "О компании",
        page: page,
      });
      break;
    case "documents":
      Documents.selectAll((err, docs) => {
        if (err) return next(err);
        res.render("about", {
          title: "О компании",
          docs: docs,
          page: page,
        });
      });
      break;
  }
};
