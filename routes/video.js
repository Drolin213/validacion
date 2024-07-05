var express = require("express"); // Importación de Express
var router = express.Router(); // Creación de un router de Express
var service_Video = require("../models/cases"); // Importación del servicio para manejar casos desde ../models/cases
var service_Answers = require("../models/answers"); // Importación del servicio para manejar casos desde ../models/answers
var service_Video = require("../models/video"); // Importación del servicio para manejar casos desde ../models/video

/* Función para listar todos los casos */
const list = (req, res) => {
  service_Video
    .list_video()
    .then((response) => res.json({ success: true, response: response })) // Enviar respuesta JSON con los casos listados
    .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};

/* Función para obtener un caso por ID */
const single = (req, res) => {
  service_Video
    .single_video({ id: req.params.id }) // Llamar al servicio para obtener un caso por ID
    .then((response) => {
      if (response) {
        res.json({ response }); // Enviar respuesta JSON con el caso encontrado
      } else {
        res.status(404).json({ success: false, message: "Case not found" }); // Enviar error 404 si no se encontró el caso
      }
    })
    .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};

/* Función para crear un nuevo caso */
const createVideo = (req, res) => {
  const { Token, name_video } = req.body; // Obtener datos del cuerpo de la solicitud
  const datavideo = { Token, name_video }; // Crear objeto con los datos del caso
  service_Video
    .create_video(datavideo) // Llamar al servicio para crear un nuevo caso
    .then((response) => res.status(201).json({ success: true, data: response })) // Enviar respuesta JSON con el caso creado
    .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};

/* Función para actualizar un caso por ID */
const updateVideo = (req, res) => {
  const { id } = req.params; // Obtener el ID del caso a actualizar desde los parámetros de la URL
  const { code_case } = req.body; // Obtener el nuevo código de caso desde el cuerpo de la solicitud
  const cases = { code_case }; // Crear objeto con el nuevo código de caso

  service_Video
    .update_video({ id }, cases) // Llamar al servicio para actualizar el caso
    .then((response) => {
      if (response.success) {
        res.json({ success: true, message: "Case updated successfully" }); // Enviar mensaje de éxito si se actualizó el caso
      } else {
        res.status(404).json({ success: false, message: "Case not found" }); // Enviar error 404 si no se encontró el caso
      }
    })
    .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};

// Definición de rutas y funciones asociadas
router.get("/all", list); // Ruta para listar todos los casos
router.get("/:id", single); // Ruta para obtener un caso por ID
router.post("/create", createVideo); // Ruta para crear un nuevo caso
router.put("/update/:id", updateVideo); // Ruta para actualizar un caso por ID

module.exports = router; // Exportar el router de Express con las rutas definidas
