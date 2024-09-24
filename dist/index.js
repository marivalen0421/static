import express from "express";
import cookieParser from 'cookie-parser';
// Fix para __dirname
import path from 'path';
import { fileURLToPath } from 'url';
var __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authentication } from "./controllers/authentication.controller.js";
import { methods as authorization } from "./middlewares/authorization.js";

// Server
var app = express();
var port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log("Servidor corriendo en puerto ".concat(port));
});

// Configuración
app.use(express["static"](path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.get("/", authorization.soloPublico, function (req, res) {
  return res.sendFile(path.join(__dirname, "/pages/admin/admin.html"));
});
app.get("/en", function (req, res) {
  return res.sendFile(path.join(__dirname, "/pages/indexEn.html"));
});
app.get("/register", authorization.soloPublico, function (req, res) {
  return res.sendFile(path.join(__dirname, "/pages/register.html"));
});
app.get("/login", authorization.soloPublico, function (req, res) {
  return res.sendFile(path.join(__dirname, "/pages/login.html"));
});
app.get("/pag", authorization.soloAdmin, function (req, res) {
  return res.sendFile(path.join(__dirname, "/pages/admin/adminc.html"));
});
app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);

// Manejo de errores
app.use(function (req, res, next) {
  res.status(404).sendFile(path.join(__dirname, 'pages', '404.html')); // Página 404 personalizada
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Algo salió mal.');
});