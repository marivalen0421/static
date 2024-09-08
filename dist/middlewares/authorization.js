"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.methods = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _authenticationController = require("./../controllers/authentication.controller.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
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
    var decodificada = _jsonwebtoken["default"].verify(cookieJWT, process.env.JWT_SECRET);
    console.log(decodificada);
    var usuarioAResvisar = _authenticationController.usuarios.find(function (usuario) {
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
var methods = exports.methods = {
  soloAdmin: soloAdmin,
  soloPublico: soloPublico
};