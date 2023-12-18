import express from "express";
import User from "../models/user.js";
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  // const user = new User({
  //   email: "beka@gmail.com",
  //   password: "beka",
  // });
  // const savedNote = await user.save();
  const user = await User.deleteMany();
  res.send(user);
});

export default userRouter;
