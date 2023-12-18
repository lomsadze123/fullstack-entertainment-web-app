import express from "express";
const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  res.send("Welcome");
});

export default loginRouter;
