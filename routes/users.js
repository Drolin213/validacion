var express = require('express'); // Importación de Express
var router = express.Router(); // Creación de un router de Express
var crypto = require('crypto'); // Importación de la librería crypto para generar tokens
var bcrypt = require('bcrypt'); // Importación de la librería bcrypt para encriptar contraseñas
var service_User = require("../models/users"); // Importación del servicio para manejar usuarios desde ../models/users
var service_Case = require("../models/cases"); // Importación del servicio para manejar casos desde ../models/cases
var service_Answers = require("../models/answers"); // Importación del servicio para manejar respuestas desde ../models/answers
const protected = require('../middleware/authMIddleware'); // Importa el middleware de autenticación

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Rutas para gestionar usuarios
 */
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
 * /users/all:
 *   get:
 *     summary: Listar todos los usuarios
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 response:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 */
/* Función para listar todos los USUARIOS */
const listuser = (req, res) => {
    service_User.list_user()
        .then((response) => res.json({ success: true, response: response })) // Enviar respuesta JSON con los casos listados
        .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};



/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     security:
 *        - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 */

/* Función para obtener un USUARIO por su id */
const singleuser = (req, res) => {
    service_User.single_user({ id_user: req.params.id }) // Llamar al servicio para obtener un caso por ID
        .then((response) => {
            if (response) {
                res.json({ response }); // Enviar respuesta JSON con el caso encontrado
            } else {
                res.status(404).json({ success: false, message: 'Case not found' }); // Enviar error 404 si no se encontró el caso
            }
        })
        .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};

const encryptPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
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
 *               rol_id:
 *                 type: string
 *               client_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *       400:
 *         description: Campos faltantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 */
/* Función para registrar un usuario */
const registerUser = async (req, res) => {
    const { name_user, password, rol_id, client_id } = req.body; // Obtener datos del cuerpo de la solicitud
    if (!name_user || !password || !rol_id || !client_id) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    //esta funcion debe ir en el controlador
    try {
        // Encriptar la contraseña
        const hashedPassword = await encryptPassword(password);

        // Generar un token de acceso aleatorio
        const accessToken = crypto.randomBytes(256).toString('hex');

        // Crear el nuevo usuario
        const newUser = {
            name_user,
            password: hashedPassword,
            rol_id,
            client_id,
            access_Token: accessToken
        };

        // Guardar el usuario en la base de datos
        const response = await service_User.create_user(newUser);
        res.status(201).json({ success: true, user: response });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

// Definición de rutas y funciones asociadas
router.get("/all",protected, listuser); // Ruta para listar todos los casos
router.get("/:id",protected, singleuser); // Ruta para obtener un caso por ID
router.post("/register",protected, registerUser); // Ruta para registrar un nuevo usuario

module.exports = router; // Exportar el router de Express con las rutas definidas
