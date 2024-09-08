import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { usuarios } from "./../controllers/authentication.controller.js";
dotenv.config();
function soloAdmin(req, res, next) {
  var logueado = revisarCookie(req);
  if (logueado) return next();
  return res.redirect("/pag");
}
function soloPublico(req, res, next) {
  var logueado = revisarCookie(req);
  if (!logueado) return next();
  return res.redirect("/");
}
function revisarCookie(req) {
  try {
    var cookieJWT = req.headers.cookie.split("; ").find(function (cookie) {
      return cookie.startsWith("jwt=");
    }).slice(4);
    var decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    console.log(decodificada);
    var usuarioAResvisar = usuarios.find(function (usuario) {
      return usuario.user === decodificada.user;
    });
    console.log(usuarioAResvisar);
    if (!usuarioAResvisar) {
      return false;
    }
    return true;
  } catch (_unused) {
    return false;
  }
}
export var methods = {
  soloAdmin: soloAdmin,
  soloPublico: soloPublico
};