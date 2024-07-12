// Importación de módulos necesarios
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var casesRouter = require('./routes/cases');
var videoRouter = require('./routes/video');
var userRouter = require('./routes/users');
var clientsRouter = require('./routes/clients');
var authRouter = require('./routes/auth');

var app = express();

// Configuración del motor de vistas y ubicación de las vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true, 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

// Middlewares para manejar solicitudes HTTP
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de las rutas de la aplicación
app.use('/', indexRouter);
app.use("/cases", casesRouter);
app.use("/users", userRouter);
app.use("/clients", clientsRouter);
app.use("/authenticate", loginRouter);
app.use("/video", videoRouter);
app.use("/auth", authRouter);

// Middleware para capturar errores 404 y redirigir al index
app.use(function(req, res, next) {
  next(createError(404));
});

// Middleware para manejar errores
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
