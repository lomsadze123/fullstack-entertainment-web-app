import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import express from "express";
import { authToken } from "../utils/middlewares.js";
import { checkPassword } from "../utils/middlewares.js";
import User from "../models/user.js";
const loginRouter = express.Router();

// loginRouter.get("/", async (req, res) => {
//   const findUser = await User.find({});
//   res.send(findUser);
// });

loginRouter.post("/", checkPassword, authToken, async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  const token = jwt.sign(
    { email: user.email, id: user.id },
    process.env.TOKEN_SECRET,
    {
      expiresIn: 60 * 60, // 1 hours
    }
  );
  res.status(200).send({ token });
});

export default loginRouter;
