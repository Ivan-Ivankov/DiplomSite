const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("dbApp.db");

db.serialize(() => {
  const stmt =
    "CREATE TABLE IF NOT EXISTS feedback_db (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, number TEXT, email TEXT, textarea TEXT)";
  db.run(stmt);
});

class Feedback {
  static create(data, cb) {
    const sql =
      "INSERT INTO feedback_db (name, number, email, textarea) VALUES (?, ?, ?, ?)";
    db.run(sql, data.name, data.number, data.email, data.textarea, cb);
  }
}
module.exports = Feedback;
