import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  // const user = await User.deleteMany();
  try {
    const users = await User.find({}).populate("bookmarkId");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

userRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).populate("bookmarkId");
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

userRouter.post("/", async (req, res) => {
  console.log("bookmarID: ", req.body);
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      repeatPassword: hashedPassword,
      bookmarkId: req.body.bookmarkId,
    });

    const savedUser = await user.save();
    console.log("saved user", savedUser);

    const token = jwt.sign(
      { email: savedUser.email, id: savedUser.id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: 60 * 60,
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
