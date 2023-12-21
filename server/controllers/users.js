import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const findUser = await User.find({});
  // const user = await User.deleteMany();
  res.send(findUser);
});

userRouter.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

userRouter.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      repeatPassword: hashedPassword,
    });

    const savedUser = await user.save();
    console.log("saved user", savedUser);

    const token = jwt.sign(
      { email: savedUser.email, id: savedUser.id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: 15,
      }
    );

    res.status(201).json({ token, savedUser });
  } catch (error) {
    if (error.name === "MongoServerError") {
      res.status(500).json({ error: "email already in use" });
    } else {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
});

export default userRouter;
