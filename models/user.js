const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("dbApp.db");
const bcrypt = require("bcrypt");

db.serialize(() => {
  const stmt =
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, password, role TEXT)";
  db.run(stmt);
});

class User {
  constructor() {}
  //запись в базу юзера
  static create(data, cb) {
    const sql = "INSERT INTO users (name, password, role) VALUES ( ?, ?, ?)";
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      //хэшируем пароль для записи в базу
      bcrypt.hash(data.password, salt, (err, hash) => {
        if (err) return next(err);
        // Store hash in your password DB.
        db.serialize(() => {
          db.run(sql, data.name, hash, data.role, cb);
          // db.get("SELECT name FROM users WHERE name=?", data.name, cb); // или id? и serialize убрать
        });
      });
    });
  }

  //поиск юзера в базе
  static findByName(username, cb) {
    db.get("SELECT * FROM users WHERE name = ?", username, cb);
  }
  //проверка аутентификации
  static authentificate(name, password, cb) {
    User.findByName(name, (err, user) => {
      if (err) return cb(err);
      if (!user) return cb();
      //взято из описания npm пакета
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) return cb(null, user);
        cb();
      });
    });
  }
}
module.exports = User;
