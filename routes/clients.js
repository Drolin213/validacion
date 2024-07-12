var express = require('express'); // Importación de Express
var router = express.Router(); // Creación de un router de Express
var service_Clients = require("../models/clients"); // Importación del servicio para manejar usuarios desde ../models/users
const protected = require('../middleware/authMIddleware'); // Importa el middleware de autenticación


/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Rutas para manejo de clientes
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
 * /clients/all:
 *   get:
 *     summary: Listar todos los clientes
 *     tags: [Clients]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error interno del servidor
 */
/* Función para listar todos los clientes */
const listclients = (req, res) => {
    service_Clients.list_clients()
        .then((response) => res.json(response)) // Enviar respuesta JSON con los casos listados
        .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};
/* Función para registrar un cliente */
/* const registerClient = async (req, res) => {
    const { client_name } = req.body; // Obtener datos del cuerpo de la solicitud
    if (!client_name) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
      
        const newClient= {
            client_name
        };

        // Guardar el usuario en la base de datos
        const response = await service_Client.create_client(newClient);
        res.status(201).json({ success: true, client: response });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
}; */

// Definición de rutas y funciones asociadas
router.get("/all",protected, listclients); // Ruta para listar todos los casos
/* router.get("/:id", singleuser); // Ruta para obtener un caso por ID
router.post("/register", registerClient); // Ruta para registrar un nuevo cliente */

module.exports = router; // Exportar el router de Express con las rutas definidas
