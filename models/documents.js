const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("dbApp.db");

db.serialize(() => {
  const stmt =
    "CREATE TABLE IF NOT EXISTS documents (id INTEGER PRIMARY KEY AUTOINCREMENT, fileName TEXT, fileType TEXT)";
  db.run(stmt);
});

class Documents {
  static uploadFile(name, type, cb) {
    const sql = "INSERT INTO documents (fileName, fileType) VALUES (?, ?)";

    db.serialize(() => {
      db.run(sql, name, type, cb);
    });
  }

  static selectAll(cb) {
    db.all("SELECT * FROM documents", cb);
  }

  static findByID(id, cb) {
    db.get("SELECT * FROM documents WHERE id = ?", id, cb);
  }

  static findByName(name, cb) {
    db.get("SELECT * FROM documents WHERE fileName = ?", name, cb);
  }

  static deleteFile(name, cb) {
    db.get("DELETE FROM documents WHERE fileName = ?", name, cb);
  }
}

module.exports = Documents;
