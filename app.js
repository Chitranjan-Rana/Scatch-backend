const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();

require("./config/mongoose-connection");

const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./index");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    name: "sessionId",
    secret: String(process.env.SESSION_SECRET),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// routes
app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});