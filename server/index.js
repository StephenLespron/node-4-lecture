require("dotenv").config();
const express = require("express"),
  app = express(),
  session = require("express-session"),
  massive = require("massive"),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 100 * 60 * 60 * 24 },
  })
);

app.get("/session", (req, res) => {
  res.send(req.session);
});

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("DB runnin'");
  app.listen(SERVER_PORT, () => console.log(`on port: ${SERVER_PORT}`));
});
