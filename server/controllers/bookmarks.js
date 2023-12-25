import Bookmark from "../models/bookmark.js";
import User from "../models/user.js";

export const getBookmark = async (req, res) => {
  const userId = req.params.id;
  const bookmark = await Bookmark.find({ userId });
  // await Bookmark.deleteMany();
  res.send(bookmark);
};

export const postBookmark = async (req, res) => {
  const { id } = req.body;
  const userId = req.user.id;

  try {
    const existingBookmark = await Bookmark.findOneAndDelete({ id, userId });
    const user = await User.findById(userId);

    if (existingBookmark) {
      user.bookmarkId.pull(existingBookmark.id);
      await user.save();
      console.log("Bookmark removed:", id);
    } else {
      const newBookmark = new Bookmark({
        id,
        userId,
      });

      const savedBookmark = await newBookmark.save();

      if (user) {
        user.bookmarkId.push(savedBookmark.id);
        await user.save();
        console.log("Bookmark saved:", savedBookmark);
      } else {
        console.log("User not found");
      }
    }

    const updatedBookmarks = await Bookmark.find({ userId });
    res.json(updatedBookmarks);
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
