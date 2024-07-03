var express = require('express'); // Importación de Express
var router = express.Router(); // Creación de un router de Express
var service = require("../models/cases"); // Importación del servicio para manejar casos desde ../models/cases

/* Función para listar todos los casos */
const list = (req, res) => {
    service.list()
        .then((response) => res.json({ success: true, data: response })) // Enviar respuesta JSON con los casos listados
        .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};

/* Función para obtener un caso por ID */
const single = (req, res) => {
    service.single({ id: req.params.id }) // Llamar al servicio para obtener un caso por ID
        .then((response) => {
            if (response) {
                res.json({ success: true, data: response }); // Enviar respuesta JSON con el caso encontrado
            } else {
                res.status(404).json({ success: false, message: 'Case not found' }); // Enviar error 404 si no se encontró el caso
            }
        })
        .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};

/* Función para crear un nuevo caso */
const createCase = (req, res) => {
    const { nombre, descripcion, aparicion } = req.body; // Obtener datos del cuerpo de la solicitud
    const cases = { nombre, descripcion, aparicion }; // Crear objeto con los datos del caso
    service.create(cases) // Llamar al servicio para crear un nuevo caso
        .then((response) => res.status(201).json({ success: true, data: response })) // Enviar respuesta JSON con el caso creado
        .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};

/* Función para actualizar un caso por ID */
const updateCase = (req, res) => {
    const { id } = req.params; // Obtener el ID del caso a actualizar desde los parámetros de la URL
    const { code_case } = req.body; // Obtener el nuevo código de caso desde el cuerpo de la solicitud
    const cases = { code_case }; // Crear objeto con el nuevo código de caso

    service.update({ id }, cases) // Llamar al servicio para actualizar el caso
        .then((response) => {
            if (response.success) {
                res.json({ success: true, message: 'Case updated successfully' }); // Enviar mensaje de éxito si se actualizó el caso
            } else {
                res.status(404).json({ success: false, message: 'Case not found' }); // Enviar error 404 si no se encontró el caso
            }
        })
        .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};

// Definición de rutas y funciones asociadas
router.get("/all", list); // Ruta para listar todos los casos
router.get("/:id", single); // Ruta para obtener un caso por ID
router.post("/create", createCase); // Ruta para crear un nuevo caso
router.put("/update/:id", updateCase); // Ruta para actualizar un caso por ID

module.exports = router; // Exportar el router de Express con las rutas definidas
