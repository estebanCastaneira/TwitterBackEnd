const { mongoose, Schema } = require("../db");

const tweetSchema = new Schema(
  {
    content: {
      type: String,
      maxLength: 140,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

tweetSchema.methods.toJSON = function () {
  const tweet = this.toObject();
  tweet.id = tweet._id.toString();
  return tweet;
};

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
