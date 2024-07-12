var express = require('express'); // Importación de Express
var router = express.Router(); // Creación de un router de Express
const protected = require('../middleware/authMIddleware'); // Importa el middleware de autenticación

var service_Case = require("../models/cases"); // Importación del servicio para manejar casos desde ../models/cases
var service_Answers = require("../models/answers"); // Importación del servicio para manejar respuestas desde ../models/answers

// Definición de rutas y funciones asociadas
/**
 * @swagger
 * tags:
 *   name: Cases
 *   description: Operaciones relacionadas con los casos
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
 * /all:
 *   get:
 *     summary: Listar todos los casos
 *     tags: [Cases]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de casos
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
 */
const list = (req, res) => {
    service_Case.list_case()
        .then((response) => res.json({ success: true, response: response })) // Enviar respuesta JSON con los casos listados
        .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Obtener un caso por ID
 *     tags: [Cases]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del caso
 *     responses:
 *       200:
 *         description: Caso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *       404:
 *         description: Caso no encontrado
 *       500:
 *         description: Error interno del servidor
 */
const single = (req, res) => {
    service_Case.single_case({ id: req.params.id }) // Llamar al servicio para obtener un caso por ID
        .then((response) => {
            if (response) {
                res.json({ response }); // Enviar respuesta JSON con el caso encontrado
            } else {
                res.status(404).json({ success: false, message: 'Case not found' }); // Enviar error 404 si no se encontró el caso
            }
        })
        .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};

/**
 * @swagger
 * /clienteid/{client_id}:
 *   get:
 *     summary: Obtener casos por ID de cliente
 *     tags: [Cases]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: client_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Casos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Casos no encontrados
 *       500:
 *         description: Error interno del servidor
 */
const casesByClientId = (req, res) => {
    const client_id =  req.params.client_id; // Obtener el client_id de los parámetros de la solicitud
    service_Case.cases_by_client_id(client_id) // Llamar al servicio para obtener los videos por client_id
      .then((results) => {
        if (results.length > 0) {
          res.json({ results }); // Enviar respuesta JSON con los videos encontrados
        } else {
          res.status(404).json({ success: false, message: 'Cases not found' }); // Enviar error 404 si no se encontraron videos
        }
      })
      .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Crear un nuevo caso
 *     tags: [Cases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code_case:
 *                 type: string
 *               client_id:
 *                 type: string
 *               response_1:
 *                 type: string
 *               response_2:
 *                 type: string
 *     responses:
 *       201:
 *         description: Caso y respuestas creadas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 'Case and answers created successfully'
 *       500:
 *         description: Error interno del servidor
 */
const createCase = (req, res) => {
    const { code_case, client_id, response_1, response_2 } = req.body; // Obtener datos del cuerpo de la solicitud

    // Verificar si se deben crear casos o solo respuestas
    if (code_case) {
        const datenew= new Date()
        const year = datenew.getFullYear();
        const month = String(datenew.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
        const day = String(datenew.getDate()).padStart(2, '0'); 
        const hours = String(datenew.getHours()).padStart(2, '0');
        const minutes = String(datenew.getMinutes()).padStart(2, '0');
        const seconds = String(datenew.getSeconds()).padStart(2, '0');
        const date= `${year}-${month}-${day}`
        const time= `${hours}:${minutes}:${seconds}`
        const cases = { code_case, client_id,date,time }; // Objeto para insertar en T_CASES

        service_Case.create_case(cases) // Llamar al servicio para crear un nuevo caso en T_CASES
           .then((caseResponse) => {
                const case_id = caseResponse

                const answers = { response_1, response_2, case_id }; // Objeto para insertar en T_ANSWERS

                return service_Answers.create_answers(answers); // Llamar al servicio para crear respuestas en T_ANSWERS                
            })
            .then((answersResponse) => { 
                res.status(201).json({ status: true, message: 'Case and answers created successfully'});
            })
            .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
    } else {
        service_Answers.create_answers(answers) // Llamar al servicio para crear respuestas en T_ANSWERS directamente
            .then((response) => {
                res.status(201).json({ success: true, message: 'Answers created successfully', answers: response });
            })
            .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
    }
};


/**
 * @swagger
 * /all:
 *   get:
 *     summary: Listar todos los casos
 *     tags: [Cases]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de casos
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
 */
router.get("/all", protected, list); // Ruta para listar todos los casos

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Obtener un caso por ID
 *     tags: [Cases]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del caso
 *     responses:
 *       200:
 *         description: Caso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *       404:
 *         description: Caso no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", protected, single); // Ruta para obtener un caso por ID

/**
 * @swagger
 * /clienteid/{client_id}:
 *   get:
 *     summary: Obtener casos por ID de cliente
 *     tags: [Cases]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: client_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Casos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Casos no encontrados
 *       500:
 *         description: Error interno del servidor
 */
router.get("/clienteid/:client_id", protected, casesByClientId); // Ruta para obtener un Client_id por ID

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Crear un nuevo caso
 *     tags: [Cases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code_case:
 *                 type: string
 *               client_id:
 *                 type: string
 *               response_1:
 *                 type: string
 *               response_2:
 *                 type: string
 *     responses:
 *       201:
 *         description: Caso y respuestas creadas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 'Case and answers created successfully'
 *       500:
 *         description: Error interno del servidor
 */
router.post("/create", createCase); // Ruta para crear un nuevo caso

module.exports = router; // Exportar el router de Express con las rutas definidas
