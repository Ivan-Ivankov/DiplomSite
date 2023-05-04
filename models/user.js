const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("dbApp.db");
const bcrypt = require("bcrypt");

db.serialize(() => {
  const stmt =
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, password, email TEXT, role TEXT, time TEXT)";
  db.run(stmt);
});

class User {
  constructor() {}
  //запись в базу юзера
  static create(data, cb) {
    const sql =
      "INSERT INTO users (name, password, email, role, time) VALUES ( ?, ?, ?, ?, ?)";
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
          db.run(sql, data.name, hash, data.email, data.role, now, cb);
        });
      });
    });
  }

  //поиск юзера в базе
  static findByName(username, cb) {
    db.get("SELECT * FROM users WHERE name = ?", username, cb);
  }
  static findByID(id, cb) {
    db.get("SELECT * FROM users WHERE id = ?", id, cb);
  }

  //проверка аутентификации
  static authentificate(name, password, cb) {
    User.findByName(name, (err, user) => {
      if (err) return cb(err);
      if (!user) return cb();
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) return cb(null, user);
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
        "UPDATE users SET name = ?, password = ?, email = ?, role = ? WHERE id = ?";

      const saltRounds = 10;

      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(data.password, salt, (err, hash) => {
          if (err) return next(err);

          db.serialize(() => {
            db.run(sql, data.name, hash, data.email, data.role, id, cb);
          });
        });
      });
    });
  }
}
module.exports = User;
