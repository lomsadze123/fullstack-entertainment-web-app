import { set, Schema, model } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

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
