import mongoose from "mongoose";
const { set, connect, Schema, model } = mongoose;
import dotenv from "dotenv";
dotenv.config();

connect(process.env.MONGODB_URL)
  .then(() => console.log("connection success"))
  .catch(() => console.log("connection error"));
set("strict", true);

const bookmarkSchema = new Schema({
  id: Number,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

bookmarkSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Bookmark = model("Bookmark", bookmarkSchema);

export default Bookmark;
