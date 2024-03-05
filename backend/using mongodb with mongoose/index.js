const express = require("express");
const app = express();
const PORT = 5000;

const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://username:password@owncluster.pgtbuvo.mongodb.net/usersdb?retryWrites=true&w=majority"
);

// db schema reference to mongoose
const User = mongoose.model("users", {
  email: String,
  password: String,
  name: String,
});


app.use(express.json());


const userExists = async (email, password) => {
  try {
    const user = await User.findOne({ email: email, password: password });

    return !!user;
  } catch (error) {
    return res.json({
      msg: "Error occured while checking if user exists or not",
    });
  }
};


app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const response = await userExists(email, password);

  if (!response) {
    return res.json({ msg: "User not found" });
  }

  const token = jwt.sign(
    {
      user: email,
      expiresAt: new Date().getTime() + 5400,
    },
    jwtPassword
  );

  return res.json({ msg: "Signed in successfully", token: token });
});


app.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.json({ msg: "User already exists" });
  }

  const user = new User({
    email: email,
    password: password,
    name: name,
  });

  // save user record in db
  user.save();

  return res.json({ msg: "New user created successfully" });
});


app.get("/", (req, res) => {});


app.listen(PORT);
