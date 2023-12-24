import express from "express";
import Bookmark from "../models/bookmark.js";
import User from "../models/user.js";
import { authToken } from "../utils/middlewares.js";
const bookmarkRouter = express.Router();

bookmarkRouter.get("/", async (req, res) => {
  const bookmark = await Bookmark.find({});
  // await Bookmark.deleteMany();
  res.send(bookmark);
});

bookmarkRouter.post("/", authToken, async (req, res) => {
  const { id } = req.body;

  // console.log("USER: ", req.user);
  // const userId = req.user.id;

  const userId = req.user.id;

  try {
    const existingBookmark = await Bookmark.findOne({ id });

    if (existingBookmark) {
      await Bookmark.deleteOne({ id });
      console.log("Bookmark removed:", id);
    } else {
      const newBookmark = new Bookmark({
        id,
        userId,
      });

      const savedBookmark = await newBookmark.save();
      console.log("Bookmark saved:", savedBookmark);
    }

    const updatedBookmarks = await Bookmark.find({});
    res.json(updatedBookmarks);
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export default bookmarkRouter;
