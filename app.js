const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");

const forms = require("./routes/forms");
const register = require("./routes/register");
const login = require("./routes/login");
const messages = require("./middleware/messages");
const users = require("./middleware/users");
// const validate = require("./middleware/validate");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname)));
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "secret1", resave: false, saveUninitialized: true }));

app.use(messages);
app.use(users);

app.get("/", (req, res) => {
  res.render("index", { title: "Выборг-Монтаж" });
});
app.get("/about", (req, res) => {
  res.render("About", { title: "О компании" });
});
app.get("/register", register.form);
app.get("/login", login.form);

app.post("/feedback", forms.submit);

app.post("/register", register.submit);

app.get("/logout", login.logout);
app.post("/login", login.submit);

app.use((req, res, next) => {
  const err = new Error("Ошибка: ресурс не найден");
  err.status = 404;
  next(err);
});

app.listen(3000, () => {
  console.log("абоба");
});
