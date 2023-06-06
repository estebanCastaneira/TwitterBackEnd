const User = require("../models/User");
const Tweet = require("../models/Tweet");
const { formatDistanceToNow, format, isSameDay } = require("date-fns");
const { en } = require("date-fns/locale");

/**
 * Este archivo se utiliza en un proyecto donde se está utlizando server-side
 * rendering (ej: con un motor de templates como EJS). Tiene como objetivo
 * mostrar (renderear) páginas que no están directamente relacionandas con
 * una entidad del proyecto.
 *
 * Ejemplos:
 *   - Página de inicio (Home).
 *   - Página de contacto.
 *   - Página con política de privacidad.
 *   - Página con términos y condiciones.
 *   - Página con preguntas frecuentes (FAQ).
 *   - Etc.
 *
 * En caso de estar creando una API, este controlador carece de sentido y
 * no debería existir.
 */

async function showHome(req, res) {
  try {
    const tweets = [];
    const following = req.user.following;
    for (const followingId of following) {
      const followingTweets = await Tweet.find({ author: followingId }).populate("author").limit(20);
      tweets.push(...followingTweets);
    }
    res.render("pages/home", {
      isSameDay,
      formatDistanceToNow,
      format,
      en,
      tweets,
    });
  } catch (error) {
    console.log(error);
  }
}

async function showContact(req, res) {
  res.render("pages/contact");
}

async function showAboutUs(req, res) {
  res.render("pages/aboutUs");
}

async function show404(req, res) {
  res.status(404).render("pages/404");
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  showContact,
  showAboutUs,
};
