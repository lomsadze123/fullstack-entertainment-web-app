import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { set, connect, Schema, model } = mongoose;

// const password = process.argv[2];
const url = process.env.MONGODB_URL;
// const url = process.env.MONGODB_URL.replace("${PASSWORD}", password);

set("strict", true);

connect(url)
  .then((result) => console.log("connection success"))
  .catch((err) => console.log("connection error"));

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
    delete returnObject.__v;
  },
});

const User = model("User", userSchema);

export default User;
