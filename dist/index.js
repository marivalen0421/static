"use strict";

var _express = _interopRequireDefault(require("express"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
var _authenticationController = require("./controllers/authentication.controller.js");
var _authorization = require("./middlewares/authorization.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Fix para __dirname

var _dirname = _path["default"].dirname((0, _url.fileURLToPath)(import.meta.url));
// Server
var app = (0, _express["default"])();
var port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log("Servidor corriendo en puerto ".concat(port));
});

// Configuración
app.use(_express["default"]["static"](_path["default"].join(_dirname, "public")));
app.use(_express["default"].json());
app.use((0, _cookieParser["default"])());

// Rutas
app.get("/", _authorization.methods.soloPublico, function (req, res) {
  return res.sendFile(_path["default"].join(_dirname, "/pages/admin/admin.html"));
});
app.get("/register", _authorization.methods.soloPublico, function (req, res) {
  return res.sendFile(_path["default"].join(_dirname, "/pages/register.html"));
});
app.get("/login", _authorization.methods.soloPublico, function (req, res) {
  return res.sendFile(_path["default"].join(_dirname, "/pages/login.html"));
});
app.get("/pag", _authorization.methods.soloAdmin, function (req, res) {
  return res.sendFile(_path["default"].join(_dirname, "/pages/admin/adminc.html"));
});
app.post("/api/login", _authenticationController.methods.login);
app.post("/api/register", _authenticationController.methods.register);

// Manejo de errores
app.use(function (req, res, next) {
  res.status(404).sendFile(_path["default"].join(_dirname, 'pages', '404.html')); // Página 404 personalizada
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Algo salió mal.');
});