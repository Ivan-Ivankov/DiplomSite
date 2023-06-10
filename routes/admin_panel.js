const User = require("../models/user");
const Feedback = require("../models/feedback");
const About = require("../models/about");

const id = false;
const reg = false;
const newsId = false;
const job = false;

// exports.list = function (req, res, next) {
//   User.selectAll((err, users) => {
//     if (err) return next(err);
//     res.render("admin_panel", {
//       title: "Панель админа",
//       admin_panel: users,
//       reg: reg,
//       id: id,
//     });
//   });
// };

exports.form = (req, res, next) => {
  const page = req.params.page;
  switch (page) {
    case "users":
      User.selectAll((err, users) => {
        if (err) return next(err);
        User.jobTitleList((err, jobTitles) => {
          if (err) return next(err);
          res.render("admin_panel", {
            title: "Панель админа",
            admin_panel: users,
            page: page,
            id: id,
            reg: reg,
            job: job,
            jobTitles: jobTitles,
          });
        });
      });
      break;
    case "feed":
      Feedback.list((err, feeds) => {
        if (err) return next(err);
        res.render("admin_panel", {
          title: "Панель админа",
          feeds: feeds,
          reg: reg,
          id: id,
          page: page,
        });
      });
      break;
    case "news":
      About.newsList((err, news) => {
        if (err) return next(err);
        res.render("admin_panel", {
          title: "Панель админа",
          news: news,
          page: page,
          changeId: newsId,
          id: id,
        });
      });
      break;
    case "documents":
      About.newsList((err, news) => {
        if (err) return next(err);
        res.render("admin_panel", {
          title: "Панель админа",
          news: news,
          page: page,
          changeId: newsId,
          id: id,
        });
      });
      break;
  }
};

exports.removeNews = (req, res, next) => {
  const id = req.params.id;
  About.removeNews(id, (err) => {
    if (err) return next(err);
  });
  res.redirect("/admin-panel/news");
};

exports.submitForm = (req, res, next) => {
  const page = req.params.page;
  const id = req.params.id;
  About.newsList((err, news) => {
    if (err) return next(err);
    res.render("admin_panel", {
      title: "Панель админа",
      news: news,
      changeId: newsId,
      page: page,
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
  res.redirect("/admin-panel/users");
};

exports.submit = (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  About.createNews(data, id, (err) => {
    if (err) return next(err);
    res.redirect("/admin-panel/news");
  });
};

exports.createJobTitleForm = (req, res, next) => {
  const page = req.params.page;
  const job = 1;
  User.selectAll((err, users) => {
    if (err) return next(err);
    User.jobTitleList((err, jobTitles) => {
      if (err) return next(err);
      res.render("admin_panel", {
        title: "Панель админа",
        admin_panel: users,
        page: page,
        id: id,
        reg: reg,
        job: job,
        jobTitles: jobTitles,
      });
    });
  });
};

exports.createJobTitle = (req, res, next) => {
  const data = req.body;
  User.findJobTitle(data.jobTitle, (err, title) => {
    if (err) return next(err);
    if (title) {
      res.error("Такая должность в базе уже есть");
      res.redirect("/admin-panel/users/jobs");
    } else {
      User.createJobTitle(data, (err) => {
        if (err) return next(err);
        res.redirect("/admin-panel/users/jobs");
      });
    }
  });
};

exports.deleteTitle = (req, res, next) => {
  const jobId = req.params.id;
  User.deleteTitle(jobId, (err) => {
    if (err) return next(err);
  });
  res.redirect("/admin-panel/users/jobs");
};

exports.changeNews = (req, res, next) => {
  const newsId = req.params.id;
  const data = req.body;
  About.change(newsId, data, (err) => {
    if (err) return next(err);
    res.redirect("/admin-panel/news");
  });
};

exports.changeNewsForm = (req, res, next) => {
  const newsId = req.params.id;
  const page = req.params.page;
  About.findByID(newsId, (err, newes) => {
    if (err) return next(err);
    About.newsList((err, news) => {
      if (err) return next(err);
      res.render("admin_panel", {
        title: "Панель админа",
        newes: newes,
        news: news,
        page: page,
        changeId: newsId,
        id: id,
      });
    });
  });
};

exports.changeUser = (req, res, next) => {
  const userId = req.params.id;
  const data = req.body.user;
  User.change(userId, data, (err) => {
    if (err) return next(err);
    res.redirect("/admin-panel/users");
  });
};

exports.id = (req, res, next) => {
  const id = req.params.id;
  const page = req.params.page;
  User.selectAll((err, users) => {
    if (err) return next(err);
    User.findByID(id, (err, user) => {
      if (err) return next(err);
      if (!user) return next();
      User.jobTitleList((err, jobTitles) => {
        if (err) return next(err);
        res.render("admin_panel", {
          title: "Панель админа",
          admin_panel: users,
          page: page,
          id: id,
          reg: reg,
          user: user,
          job: job,
          jobTitles: jobTitles,
        });
      });
    });
  });
};

exports.reg = (req, res, next) => {
  const reg = true;
  const page = req.params.page;
  User.selectAll((err, users) => {
    if (err) return next(err);
    User.jobTitleList((err, jobTitles) => {
      if (err) return next(err);
      res.render("admin_panel", {
        title: "Панель админа",
        admin_panel: users,
        page: page,
        id: id,
        reg: reg,
        id: id,
        job: job,
        jobTitles: jobTitles,
      });
    });
  });
};

exports.removeFeed = (req, res, next) => {
  const feedid = req.params.id;
  Feedback.deleteFeed(feedid, (err) => {
    if (err) return next(err);
  });
  res.redirect("/admin-panel/feed");
};

exports.uploadFile = (req, res, next) => {
  const page = req.params.page;
  const data = req.body;
};
