const flash = require("connect-flash");

async function mwFlash(req, res, next) {
  res.locals.flashFailure = req.flash("failureFlash");
  res.locals.flashSuccess = req.flash("successFlash");
  return next();
}

module.exports = mwFlash;
