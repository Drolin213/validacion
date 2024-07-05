var express = require('express');
var router = express.Router();
var userService = require('../models/login'); // Importación del servicio de usuarios

/* Función para autenticar a un usuario */
const login_user = async (req, res) => {
    const { name_user, password } = req.body; // Obtener datos del cuerpo de la solicitud

    // Autenticar usuario usando el servicio de usuarios
    const result = await userService.authenticate_user(name_user, password);

    if (result.success) {
        res.json({ message: 'Autenticación exitosa', user: result.data });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
};

// Definición de la ruta de login
router.post('/login', login_user);

module.exports = router;
