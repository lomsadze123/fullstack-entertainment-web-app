import { set, Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import dotenv from "dotenv";
dotenv.config();

set("strict", true);

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
      type: Number,
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
