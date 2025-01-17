const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");
const users = require("./data/users.dummy.js");

const port = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log("Time:", Date.now());
  console.log(req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", (req, res) => {
  console.log("body", req.body);

  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  const user = users.find((user) => {
    if (user.email === email && user.password === password) {
      return user;
    }
  });

  if (user) {
    const token = jsonwebtoken.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET
    );
    return res.send({ token });
  }
  return res.status(401).send("Unauthorized");
});

app.get("/users", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const loggedUser = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    if (loggedUser.rol !== "admin") {
      throw new Error("This end point is only for admins");
    }
    res.send(users);
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
});

app.get("/user", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const loggedUser = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const user = users.find((user) => user.id === loggedUser.id);
    return res.send(user);
  } catch (error) {
    console.log(error);
    return res.status(401).send("Unauthorized");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
