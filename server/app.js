import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import loginRouter from "./controllers/login.js";
import userRouter from "./controllers/users.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);

app.listen(process.env.PORT || 3001, () =>
  console.log("listening on port " + process.env.PORT || 3001)
);