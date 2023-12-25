import User from "../models/user.js";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../controllers/login.js";
import dotenv from "dotenv";
dotenv.config();

export const authToken = (req, res, next) => {
  const authorization = req.get("authorization");
  const getToken = authorization && authorization.split(" ")[1];

  if (getToken == null) return res.status(401).json({ error: "missing token" });

  jwt.verify(getToken, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      if (err.name === "TokenExpiredError") {
        const newToken = req.user ? generateToken(req.user) : null;
        if (newToken) {
          res.setHeader("Authorization", `Bearer ${newToken}`);
          return next();
        }
      } else {
        return res.status(500).json({ error: err.message });
      }
    }
    req.user = user;
    next();
  });
};

export const checkPassword = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const passwordCheck = await compare(password, user.password);

    if (!passwordCheck) {
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
