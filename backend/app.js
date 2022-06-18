import express from "express";
import jwt from "jsonwebtoken";

const USERS = [
  {
    name: "Test Name",
    email: "test@test.com",
    password: "test",
    metas: "Meta data",
    role: "Student",
  },
  {
    name: "Test Tutor",
    email: "test1@test.com",
    password: "test",
    metas: "Meta data",
    role: "Tutor",
  },
];

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.post("/signup", (req, res, next) => {
  console.log(req.body);
  return res.status(200).json({
    message: "User Registered successfully",
  });
});

app.post("/login", (req, res, next) => {
  console.log("Login call");
  console.log(req.body);
  const user = USERS.find((data) => data.email === req.body.email);
  if (!user) {
    return res.status(400).json({
      message: "Bad credentials",
    });
  }
  console.log("User: ", user);
  if (user.password === req.body.password) {
    const token = jwt.sign(user, "GOODSECRET", {
      expiresIn: 3600,
    });

    return res.status(200).json({
      message: "User logged in",
      token,
      data: user,
      expiresIn: 3600,
    });
  } else {
    return res.status(400).json({
      message: "Bad credentials",
    });
  }
});

app.listen(3001, () => {
  console.log("Server started");
});
