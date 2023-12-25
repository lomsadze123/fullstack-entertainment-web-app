import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// loginRouter.get("/", async (req, res) => {
//   const findUser = await User.find({});
//   res.send(findUser);
// });

const login = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  console.log("user: " + user);

  const token = jwt.sign(
    { email: user.email, id: user.id },
    process.env.TOKEN_SECRET,
    {
      expiresIn: 60 * 60, // 1 hours
    }
  );
  res.status(200).send({ token });
};

export default login;
