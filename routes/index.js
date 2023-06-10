const authRoutes = require("./authRoutes");
const userFollowsRoutes = require("./userFollowsRoutes");
const userRoutes = require("./userRoutes");
const tweetRoutes = require("./tweetRoutes");
//const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

// const privateRoutes = require("./privateRoutes");

module.exports = (app) => {
  app.use("/users", userRoutes);
  app.use("/tweets", tweetRoutes);

  app.use("/", authRoutes);
  app.use("/", userFollowsRoutes);

  //   app.use(ensureAuthenticated);
};
