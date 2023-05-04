const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
var favicon = require("serve-favicon");
const forms = require("./routes/forms");
const register = require("./routes/register");
const login = require("./routes/login");
const messages = require("./middleware/messages");
const users = require("./middleware/users");
const admin_panel = require("./routes/admin_panel");
const forUsers = require("./routes/forUsers");
// const validate = require("./middleware/validate");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname)));
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "secret1", resave: false, saveUninitialized: true }));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use(messages);
app.use(users);

app.get("/", (req, res) => {
  res.render("index", { title: "Выборг-Монтаж" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "О компании" });
});
app.get("/forUsers/:page", forUsers.list);

app.get("/admin-panel", admin_panel.list);
app.get("/admin-panel/:id/del", admin_panel.removeUser);
app.get("/admin-panel/:id", admin_panel.id);
app.post("/admin-panel/:id/ch", admin_panel.changeUser);

app.get("/admin-panel/register", admin_panel.reg);
app.get("/login", login.form);

app.post("/feedback", forms.submit);

app.post("/admin-panel/register", register.submit);

app.get("/logout", login.logout);
app.post("/login", login.submit);

app.use((req, res, next) => {
  const err = new Error("Ошибка: ресурс не найден");
  err.status = 404;
  next(err);
});
//development mode
if (app.get("env") === "development") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render("error.ejs", { error: err, message: err.message });
  });
}
//production mode
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error.ejs", { message: err.message, err: {} });
});

app.listen(3000, () => {
  console.log("абоба");
});
