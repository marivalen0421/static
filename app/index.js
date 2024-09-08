import express from "express";
import cookieParser from 'cookie-parser';
// Fix para __dirname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import {methods as authentication} from "./controllers/authentication.controller.js";
import {methods as authorization} from "./middlewares/authorization.js";

// Server
const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});

// Configuración
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.get("/", authorization.soloPublico, (req, res) => res.sendFile(path.join(__dirname, "/pages/admin/admin.html")));
app.get("/register", authorization.soloPublico, (req, res) => res.sendFile(path.join(__dirname, "/pages/register.html")));
app.get("/login", authorization.soloPublico, (req, res) => res.sendFile(path.join(__dirname, "/pages/login.html")));
app.get("/pag", authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, "/pages/admin/adminc.html")));

app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);

// Manejo de errores
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'pages', '404.html')); // Página 404 personalizada
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal.');
});
