var express = require('express'); // Importación de Express
var router = express.Router(); // Creación de un router de Express
var service_Case = require("../models/cases"); // Importación del servicio para manejar casos desde ../models/cases
var service_Answers = require("../models/answers"); // Importación del servicio para manejar casos desde ../models/answers
const { status } = require('express/lib/response');

/* Función para listar todos los casos */
const list = (req, res) => {
    service_Case.list_case()
        .then((response) => res.json({ success: true, response: response })) // Enviar respuesta JSON con los casos listados
        .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};


/* Función para obtener un caso por ID */
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

/* Función para crear un nuevo caso */
const createCase = (req, res) => {
    const { code_case, response_1, response_2 } = req.body; // Obtener datos del cuerpo de la solicitud

    // Verificar si se deben crear casos o solo respuestas
    if (code_case) {
        const cases = { code_case }; // Objeto para insertar en T_CASES

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





// Definición de rutas y funciones asociadas
router.get("/all", list); // Ruta para listar todos los casos
router.get("/:id", single); // Ruta para obtener un caso por ID
router.post("/create", createCase); // Ruta para crear un nuevo caso

module.exports = router; // Exportar el router de Express con las rutas definidas
