const authRoutes = require("./authRoutes");
const userFollowsRoutes = require("./userFollowsRoutes");
const userRoutes = require("./userRoutes");
const tweetRoutes = require("./tweetRoutes");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

// const privateRoutes = require("./privateRoutes");

module.exports = (app) => {
  /**
   * Notar que si el sitio está en español, tiene sentido que las URLs que se
   * ven en la barra de direcciiones del navegador también lo estén. No así los
   * nombres de variables, funciones, etc, que siempre se recomienda que estén
   * en inglés.
   */

  app.use("/", authRoutes);
  app.use("/", userRoutes);
  //   app.use(ensureAuthenticated);

  //   app.use("/", tweetRoutes);
  //   app.use("/", userFollowsRoutes); // para ver /following /followers
};

// PD: Recordar que es muy importante el orden en que se definen las rutas
