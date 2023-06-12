function tryCatchHandler(routeHandler) {
  return async (req, res, next) => {
    try {
      await routeHandler(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = tryCatchHandler;
