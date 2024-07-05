// Importación de módulos necesarios
var createError = require('http-errors'); // Para crear errores HTTP
var express = require('express'); // Framework web de Node.js
var path = require('path'); // Para manejar rutas de archivos
var cookieParser = require('cookie-parser'); // Middleware para analizar cookies
var logger = require('morgan'); // Middleware para registrar solicitudes HTTP

// Carga de variables de entorno desde archivo .env
const dotenv = require("dotenv");
dotenv.config();

// Importación de rutas definidas en archivos separados
var indexRouter = require('./routes/index'); // Rutas para el punto de entrada '/'
var loginRouter = require('./routes/login'); // Rutas relacionadas con login '/login'
var casesRouter = require('./routes/cases'); // Rutas relacionadas con casos '/cases'
var videoRouter = require('./routes/video'); // Rutas relacionadas con video '/video'
var userRouter = require('./routes/users'); // Rutas relacionadas con casos '/users'

var app = express(); // Creación de la aplicación Express

// Configuración del motor de vistas y ubicación de las vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middlewares para manejar solicitudes HTTP
app.use(logger('dev')); // Logger para registrar solicitudes en modo 'dev'
app.use(express.json()); // Parseo de cuerpos de solicitud en formato JSON
app.use(express.urlencoded({ extended: false })); // Parseo de cuerpos de solicitud en formato URL-encoded
app.use(cookieParser()); // Middleware para analizar cookies
app.use(express.static(path.join(__dirname, 'public'))); // Servicio de archivos estáticos en la carpeta 'public'

// Configuración de las rutas de la aplicación
app.use('/', indexRouter); // Usar las rutas definidas en indexRouter para '/'
app.use("/cases", casesRouter); // Usar las rutas definidas en casesRouter para '/cases'
app.use("/users", userRouter); // Usar las rutas definidas en casesRouter para '/user'
app.use("/authenticate", loginRouter); // Usar las rutas definidas en loginRouter para '/authenticate'
app.use("/video", videoRouter); // Usar las rutas definidas en videoRouter para '/video'

// Middleware para capturar errores 404 y redirigir al index
app.use(function(req, res, next) {
  next(createError(404)); // Crear un error 404 para rutas no encontradas
});

// Middleware para manejar errores
app.use(function(err, req, res, next) {
  // Establecer variables locales para las vistas
  res.locals.message = err.message; // Mensaje de error
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // Detalles del error en entorno de desarrollo

  // Renderizar la página de error
  res.status(err.status || 500); // Establecer el código de estado HTTP
  res.render('error'); // Renderizar la plantilla de error ('error.hbs')
});

module.exports = app; // Exportar la aplicación Express para usar en otros módulos
