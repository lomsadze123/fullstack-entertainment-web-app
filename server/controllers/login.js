import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// loginRouter.get("/", async (req, res) => {
//   const findUser = await User.find({});
//   res.send(findUser);
// });

export const generateToken = (user) => {
  if (!user) {
    console.error("User is undefined in generateToken");
    return null;
  }
  return jwt.sign(
    { email: user.email, id: user.id },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "100y",
    }
  );
};

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const token = generateToken(user);

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export default login;
