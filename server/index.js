const express = require("express");
const app = express();
require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");
const users = require("./data/users.dummy.js");
const cors = require("cors");

const port = process.env.PORT || 3000;

app.use(cors());
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

const getUserFromHeader = (req) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) throw new Error("A token is necessary");
  const loggedUser = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  if (!loggedUser) throw new Error("Invalid token");
  return loggedUser;
};

app.use((req, res, next) => {
  try {
    const loggedUser = getUserFromHeader(req);
    req.user = loggedUser;
    console.log({ loggedUser });
    next();
  } catch (error) {
    console.log({ error });
    return res.status(401).send("Unauthorized");
  }
});

app.get("/user", (req, res) => {
  const loggedUser = req.user;
  try {
    const user = users.find((user) => user.id === loggedUser.id);
    return res.send(user);
  } catch (error) {
    console.log(error);
    return res.status(401).send("Unauthorized");
  }
});

app.use((req, res, next) => {
  if (req.user.rol !== "admin") {
    return res.status(401).send("Unauthorized");
  } else {
    next();
  }
});

app.get("/users", (req, res) => res.send(users));

app.put("/user", (req, res) => {
  const user = req.body;
  const loggedUser = req.user;
  users = user.map((user) => {
    if (user.id === loggedUser.id) {
      return req.body;
    } else {
      return user;
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
