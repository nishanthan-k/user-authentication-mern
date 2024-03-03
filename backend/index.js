const express = require("express");
const app = express();
const PORT = 5000;

// jtw validation
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

// getting users data from a json file
const fs = require("fs");
const dataFile = JSON.parse(fs.readFileSync("./data/usersList.json"));
const userData = dataFile.users;

app.use(express.json());

const userExists = (email, password) => {
  const user = userData.find(
    (user) => user.email == email && user.password == password
  );

  return user ? true : false;
};

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!userExists(email, password)) {
    return res.json({ msg: "User not found" });
  }

  const token = jwt.sign({ user: email }, jwtPassword);

  return res.json({ token: token });
});

app.get("/", (req, res) => {
  const token = req.headers.authorization;

  try {
    const validateUser = jwt.verify(token, jwtPassword);
    const user = validateUser.user;

    return res.send(`Welcome ${user}! You are an authorized user`);
  } catch {
    return res.send("Sorry, you are not an authorized user");
  }
});

app.listen(PORT);
