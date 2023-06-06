/**
 * Este archivo se creó para centralizar el código referente a Passport.
 *
 * Su nombre es arbitrario, aunque tenía sentido llamarle `passport.js`.
 *
 * Se lo colocó en la raíz del proyecto, aunque otra opción válida podría haber
 * sido colocarlo en una carpeta que contenga archivos de configuración, por
 * ejemplo, llamada `/config`.
 */

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");
const bcrypt = require("bcryptjs"); 



module.exports = (app) => {
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async function (email, password, cb) {
        try{
        const user = await User.findOne({ email: email });
        if (!user) {
          console.log("Usuario no existe.");
          return cb(null, false, { message: "Email incorrecto." });
        }

        const match = await bcrypt.compare(password, user.password);;

        if (!match) {
          console.log("La contraseña es inválida.");
          return cb(null, false, { message: "Contraseña incorrecta." });
        }

        console.log("Login successful");
        return cb(null, user);
      }catch(error){
        return cb(error);
      }
      },
    ),
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await User.findById(id).populate("tweets");
      cb(null, user); // Usuario queda disponible en req.user.
    } catch (err) {
      cb(err);
    }
  });
};
