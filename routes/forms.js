const Feedback = require("../models/feedback");

exports.submit = (req, res, next) => {
  const data = req.body;
  const entry = {
    name: data.name,
    number: data.number,
    email: data.email,
    textarea: data.textarea,
  };

  Feedback.create(entry, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};
