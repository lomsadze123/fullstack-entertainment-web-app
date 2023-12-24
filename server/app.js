import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import loginRouter from "./controllers/login.js";
import userRouter from "./controllers/users.js";
import bookmarkRouter from "./controllers/bookmarks.js";
import { authToken } from "./utils/middlewares.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/bookmarks", bookmarkRouter);

app.listen(process.env.PORT || 3001, () =>
  console.log("listening on port " + process.env.PORT || 3001)
);
