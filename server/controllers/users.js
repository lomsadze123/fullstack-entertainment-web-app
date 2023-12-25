import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const getUser = async (req, res) => {
  // const user = await User.deleteMany();
  try {
    const users = await User.find({}).populate("bookmarkId");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const postUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      repeatPassword: hashedPassword,
      bookmarkId: req.body.bookmarks,
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
};
