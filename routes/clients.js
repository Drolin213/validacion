var express = require('express'); // Importación de Express
var router = express.Router(); // Creación de un router de Express
var service_Clients = require("../models/clients"); // Importación del servicio para manejar usuarios desde ../models/users
const protected = require('../middleware/authMIddleware'); // Importa el middleware de autenticación

/* Función para listar todos los casos */
const listclients = (req, res) => {
    service_Clients.list_clients()
        .then((response) => res.json(response)) // Enviar respuesta JSON con los casos listados
        .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};

/* Función para obtener un caso por ID */



/* Función para registrar un usuario */
/* const registerUser = async (req, res) => {
    const { name_user, password, rol_id, client_id } = req.body; // Obtener datos del cuerpo de la solicitud
    if (!name_user || !password || !rol_id || !client_id) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

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
}; */

// Definición de rutas y funciones asociadas
router.get("/all",protected, listclients); // Ruta para listar todos los casos
/* router.get("/:id", singleuser); // Ruta para obtener un caso por ID
router.post("/register", registerUser); // Ruta para registrar un nuevo usuario */

module.exports = router; // Exportar el router de Express con las rutas definidas
