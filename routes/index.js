var express = require('express');
var router = express.Router();
const db = require("../db");

/* GET home page. */
router.get('/', function(req, res, next) {
  // Verificar conexión a la base de datos
  db.raw('SELECT 1')
    .then(() => {
      res.render('index', { title: 'API-REST', dbStatus: 'Conectado a la base de datos con éxito' });
    })
    .catch((err) => {
      res.render('error', { message: 'Error al conectar con la base de datos', error: err });
    });
});

module.exports = router;
