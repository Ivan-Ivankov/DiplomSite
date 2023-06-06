const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("dbApp.db");
const bcrypt = require("bcrypt");

db.serialize(() => {
  const stmt =
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT UNIQUE, name TEXT, seminame TEXT, surname TEXT, password, email TEXT, role TEXT, jobTitle TEXT, time TEXT)";
  const sstmt =
    " CREATE TABLE IF NOT EXISTS job_titles (id INTEGER PRIMARY KEY AUTOINCREMENT, job_title TEXT UNIQUE)";
  db.run(stmt);
  db.run(sstmt);
});

class User {
  constructor() {}
  //запись в базу юзера
  static create(data, cb) {
    const sql =
      "INSERT INTO users (login, name, seminame, surname, password, email, role, jobTitle, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const saltRounds = 10;
    const today = new Date();

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const now = today.toLocaleString("ru-RU", options);

    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(data.password, salt, (err, hash) => {
        if (err) return next(err);

        db.serialize(() => {
          db.run(
            sql,
            data.login,
            data.name,
            data.seminame,
            data.surname,
            hash,
            data.email,
            data.role,
            data.jobTitle,
            now,
            cb
          );
        });
      });
    });
  }

  //поиск юзера в базе
  static findByName(login, cb) {
    db.get("SELECT * FROM users WHERE login = ?", login, cb);
  }
  static findByID(id, cb) {
    db.get("SELECT * FROM users WHERE id = ?", id, cb);
  }
  //проверка аутентификации
  static authentificate(login, password, cb) {
    User.findByName(login, (err, user) => {
      if (err) return cb(err);
      if (!user) return cb();
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) return cb(null, login);
        cb();
      });
    });
  }
  static selectAll(cb) {
    db.all("SELECT * FROM users", cb);
  }
  static deleteUser(id, cb) {
    db.get("DELETE FROM users WHERE id = ?", id, cb);
  }
  static change(id, data, cb) {
    User.findByID(id, (err, user) => {
      if (err) return cb(err);
      if (!user) return cb();

      const sql =
        "UPDATE users SET login = ?, name = ?, seminame = ?, surname = ?, password = ?, email = ?, role = ?, jobTitle = ? WHERE id = ?";

      const saltRounds = 10;

      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(data.password, salt, (err, hash) => {
          if (err) return next(err);

          db.serialize(() => {
            db.run(
              sql,
              data.login,
              data.name,
              data.seminame,
              data.surname,
              hash,
              data.email,
              data.role,
              data.jobTitle,
              id,
              cb
            );
          });
        });
      });
    });
  }
  static createJobTitle(data, cb) {
    const sql = "INSERT INTO job_titles (job_title) VALUES (?)";
    db.serialize(() => {
      db.run(sql, data.jobTitle, cb);
    });
  }

  static jobTitleList(cb) {
    db.all("SELECT * FROM job_titles", cb);
  }

  static findJobTitle(jobTitle, cb) {
    db.get("SELECT * FROM job_titles WHERE job_title = ?", jobTitle, cb);
  }

  static deleteTitle(id, cb) {
    db.get("DELETE FROM job_titles WHERE id = ?", id, cb);
  }
}
module.exports = User;
