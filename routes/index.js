const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const tweetRoutes = require("./tweetRoutes");
const userFollowsRoutes = require("./userFollowsRoutes");

module.exports = (app) => {
  app.use("/", authRoutes);
  app.use("/users", userRoutes);
  app.use("/tweets", tweetRoutes);
  app.use("/", userFollowsRoutes);
};
