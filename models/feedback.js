const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("dbApp.db");

db.serialize(() => {
  const stmt =
    "CREATE TABLE IF NOT EXISTS feedback_db (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, number TEXT, email TEXT, date TEXT, textarea TEXT)";
  db.run(stmt);
});

class Feedback {
  static create(data, cb) {
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
    const sql =
      "INSERT INTO feedback_db (name, number, email, date, textarea) VALUES (?, ?, ?, ?, ?)";
    db.run(sql, data.name, data.number, data.email, now, data.textarea, cb);
  }
  static list(cb) {
    db.all("SELECT * FROM feedback_db", cb);
  }
  static deleteFeed(id, cb) {
    db.get("DELETE feedback_db WHERE id = ?", id, cb);
  }
}
module.exports = Feedback;
