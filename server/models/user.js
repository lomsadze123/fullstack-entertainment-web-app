import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import dotenv from "dotenv";
dotenv.config();
const { set, connect, Schema, model } = mongoose;

const url = process.env.MONGODB_URL;
set("strict", true);

connect(url)
  .then((result) => console.log("connection success"))
  .catch((err) => console.log("connection error"));

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bookmarkId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bookmark",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
    delete returnObject.__v;
  },
});

userSchema.plugin(uniqueValidator);
const User = model("User", userSchema);

export default User;
