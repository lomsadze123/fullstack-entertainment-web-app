import User from "../models/user.js";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    { email: user.email, id: user.id },
    process.env.TOKEN_SECRET,
    {
      expiresIn: 15, // 1 hours
    }
  );
};

export const authToken = (req, res, next) => {
  const authorization = req.get("authorization");
  const getToken = authorization && authorization.split(" ")[1];
  if (getToken == null) return res.status(401).json({ error: "missing token" });

  jwt.verify(getToken, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        const newToken = generateToken(req.user);
        res.setHeader("Authorization", `Bearer ${newToken}`);
        return next();
      } else {
        return res.status(403).json({ error: err.message });
      }
    }
    req.user = user;
    next();
  });
};

export const checkPassword = async (req, res, next) => {
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
    req.user = user;
    next();
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
