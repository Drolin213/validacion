const express = require('express');
const router = express.Router();
const userService = require('../models/login'); // Importa el modelo de usuario para la autenticación

/* Función para autenticar a un usuario */
const loginUser = async (req, res) => {
    const { name_user, password } = req.body; // Obtén los datos del cuerpo de la solicitud

    try {
        // Autenticar usuario utilizando el modelo de usuario
        const result = await userService.authenticateUser(name_user, password);

        if (result.success) {
            res.json({
                response: {
                    status: true,
                    user: result.user // Devuelve los datos del usuario autenticado
                }
            });
        } else {
            res.status(401).json({
                response: {
                    status: false
                },
                message: result.message // Devuelve el mensaje de error desde el modelo
            });
        }
    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(500).json({
            response: {
                status: false
            },
            message: 'Error en la autenticación'
        });
    }
};



// Define la ruta de login
router.post('/login', loginUser);

module.exports = router;
