import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import express from "express";
import { compare } from "bcrypt";
import User from "../models/user.js";
const loginRouter = express.Router();

const authToken = (req, res, next) => {
  const authorization = req.get("authorization");
  const getToken = authorization && authorization.split(" ")[1];
  if (getToken == null) return res.status(401).json({ error: "missing token" });

  jwt.verify(getToken, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: err.message });
    req.user = user;
    next();
  });
  console.log("shemovedi");
};

// loginRouter.get("/", async (req, res) => {
//   const findUser = await User.find({});
//   res.send(findUser);
// });

loginRouter.post("/", authToken, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  try {
    const passwordCheck =
      user === null ? false : await compare(password, user.password);

    if (!(user && passwordCheck)) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }

  const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.TOKEN_SECRET,
    {
      expiresIn: 3600, // 1 hours
    }
  );
  res.status(200).send({ token });
});

export default loginRouter;
