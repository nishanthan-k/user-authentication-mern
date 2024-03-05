const express = require("express");
const app = express();
const PORT = 5000;

const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://nishanthan:Shivayanama@owncluster.pgtbuvo.mongodb.net/usersdb?retryWrites=true&w=majority"
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
    const user = await User.findOne({ email: email });

    if (user) {
      return true
    }
                                                                                                                                                
    return false; // User not found
  } catch (error) {
    console.error("Error while checking user:", error);
    return false; // Return false in case of any errors
  }
};


app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  console.log(userExists(email, password));
  // if (!userExists(email, password)) {
  //   return res.json({ msg: "Invalid User" });
  // }

  // const token = jwt.sign({
  //     user: email,
  //     expiresAt: new Date().getTime() + 5400,
  //   },
  //   jwtPassword
  // );

  // return res.json({token: token})
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

  // // save user record in db
  user.save();

  return res.json({ msg: "New user created successfully" });
});

app.get("/", (req, res) => {
  console.log("Get request gotten");
});

app.listen(PORT);
