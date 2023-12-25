import express from "express";
import cors from "cors";
import routers from "./routes/index.js";
import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", routers);

connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("connection success"))
  .catch(() => console.log("connection error"));

app.listen(process.env.PORT || 3001, () =>
  console.log("listening on port " + process.env.PORT || 3001)
);
