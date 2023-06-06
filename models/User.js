const { mongoose, Schema } = require("../db");

// Crear esquema y modelo User...

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    bio: String,
    avatar: String,
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
