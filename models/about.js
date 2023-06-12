const User = require("../models/user");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("dbApp.db");

db.serialize(() => {
  const stmt =
    "CREATE TABLE IF NOT EXISTS news (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, seminame TEXT, role TEXT, theme TEXT, text TEXT, time TEXT)";
  db.run(stmt);
});

class About {
  constructor() {}

  static createNews(data, id, cb) {
    const sql =
      "INSERT INTO news (name, seminame, role, theme, text, time) VALUES (?, ?, ?, ?, ?, ?)";

    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const now = today.toLocaleString("ru-RU", options);

    User.findByID(id, (err, user) => {
      if (err) return next(err);
      if (!user) return next();
      db.serialize(() => {
        db.run(
          sql,
          user.name,
          user.seminame,
          user.jobTitle,
          data.theme,
          data.text,
          now,
          cb
        );
      });
    });
  }

  static findByID(id, cb) {
    db.get("SELECT * FROM news WHERE id = ?", id, cb);
  }

  static removeNews(id, cb) {
    db.get("DELETE FROM news WHERE id = ?", id, cb);
  }

  static newsList(cb) {
    db.all("SELECT * FROM news", cb);
  }

  static change(id, data, cb) {
    About.findByID(id, (err, news) => {
      if (err) return cb(err);
      if (!news) return cb();

      const today = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const now = today.toLocaleString("ru-RU", options);

      const sql = "UPDATE news SET theme = ?, text = ?, time = ? WHERE id = ?";

      db.serialize(() => {
        db.run(sql, data.theme, data.text, data.time, id, cb);
      });
    });
  }
}

module.exports = About;
