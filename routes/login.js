const express = require('express');
const router = express.Router();
const userService = require('../models/login'); // Importa el modelo de usuario para la autenticación
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser'); // Middleware para analizar cookies
const app=express()
app.use(cookieParser())


/* Función para autenticar a un usuario */
const loginUser = async (req, res) => {
    const { name_user, password } = req.body; // Obtén los datos del cuerpo de la solicitud
    try {
        // Autenticar usuario utilizando el modelo de usuario
        const result = await userService.authenticateUser(name_user, password);
        if (result.success) {
            const token= jwt.sign({name_user:result.user.name_user,id:result.user.id,rol_id:result.user.rol_id},
                process.env.SECRET_JWT_KEY,
                {expiresIn:'15m'}) 
            res
            .cookie('access_token',token,{
                httpOnly:true,
                secure:process.env.NODE_ENV==="production",
                sameSite:'strict'
            })
            .json({
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

router.get('/logout', (req, res) => {
    res.clearCookie('access_token'); // Limpiar la cookie 'access_token'
    console.log("Deslogeado exitoso")
    res.json({ success: true, message: 'Logout successful' });
});


// Define la ruta de login
router.post('/login', loginUser);

module.exports = router;
