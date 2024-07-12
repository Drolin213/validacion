const express = require('express');
const router = express.Router();
const userService = require('../models/login'); // Importa el modelo de usuario para la autenticación
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser'); // Middleware para analizar cookies
const app=express()
app.use(cookieParser())

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Rutas de autenticación
 */

/**
 * @swagger
 * /authenticate/login:
 *   post:
 *     summary: Autenticar un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name_user:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: boolean
 *                       example: true
 *                     user:
 *                       type: object
 *       401:
 *         description: Autenticación fallida
 *       500:
 *         description: Error en la autenticación
 */
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

/**
 * @swagger
 * securitySchemes:
 *   cookieAuth:
 *     type: apiKey
 *     in: cookie
 *     name: access_token
 *     description: Cookie de autenticación con el token de acceso.
 */
/**
 * @swagger
 * /authenticate/logout:
 *   get:
 *     summary: Cerrar sesión de un usuario
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logout exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 'Logout successful'
 */
/* Función para cerrar sesión de un usuario */
router.get('/logout', (req, res) => {
    res.clearCookie('access_token'); // Limpiar la cookie 'access_token'
    res.json({ success: true, message: 'Logout successful' });
});


// Define la ruta de login
router.post('/login', loginUser);

module.exports = router;
