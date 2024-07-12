const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const service_Video = require("../models/video");
const protected = require('../middleware/authMIddleware'); // Importa el middleware de autenticación



/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: Rutas para gestionar videos
 */

/**
 * @swagger
 * /video/all:
 *   get:
 *     summary: Listar todos los videos
 *     tags: [Videos]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de videos obtenida exitosamente
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

/**
 * @swagger
 * /video/create:
 *   post:
 *     summary: Crear un nuevo video
 *     tags: [Videos]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name_video:
 *                 type: string
 *               client_id:
 *                 type: string
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Video creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 response:
 *                   type: object
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

/**
 * @swagger
 * securitySchemes:
 *   cookieAuth:
 *     type: apiKey
 *     in: cookie
 *     name: access_token
 *     description: Cookie de autenticación con el token de acceso.
 */


/* Función para listar todos los videos */
const listvideo = (req, res) => {
  service_Video.list_video()
      .then((response) => res.json({ success: true, response: response })) // Enviar respuesta JSON con los videos listados
      .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};




/**
 * @swagger
 * /video/{id}:
 *   get:
 *     summary: Obtener un video por ID
 *     tags: [Videos]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del video
 *     responses:
 *       200:
 *         description: Video obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *       404:
 *         description: Video no encontrado
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

// Función para obtener un video por ID
const singleVideo = (req, res) => {
  service_Video.single_video({ id: req.params.id }) // Llamar al servicio para obtener un video por ID
    .then((response) => {
      if (response) {
        res.json({ response }); // Enviar respuesta JSON con el video encontrado
      } else {
        res.status(404).json({ success: false, message: 'Case not found' }); // Enviar error 404 si no se encontró el video
      }
    })
    .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};


/**
 * @swagger
 * /video/clienteid/{client_id}:
 *   get:
 *     summary: Obtener videos por ID de cliente
 *     tags: [Videos]
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
 *         description: Videos obtenidos exitosamente
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
 *         description: No se encontraron videos para este ID de cliente
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

// Función para obtener un video por ID cliente
const videosByClientId = (req, res) => {
  const client_id =  req.params.client_id; // Obtener el client_id de los parámetros de la solicitud
  service_Video.videos_by_client_id(client_id) // Llamar al servicio para obtener los videos por client_id
    .then((results) => {
      if (results.length > 0) {
        res.json({ results }); // Enviar respuesta JSON con los videos encontrados
      } else {
        res.status(404).json({ success: false, message: 'No videos found for this client_id' }); // Enviar error 404 si no se encontraron videos
      }
    })
    .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};


// Configuración de multer para guardar archivos en una carpeta específica
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { client_id } = req.body; // Obtener client_id del cuerpo de la solicitud
    const uploadDir = path.join("C:/xampp/htdocs/reports-FrontEnd/public/videos", client_id); // Ruta donde se guardarán los archivos
    
    // Crear la carpeta si no existe
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const { name_video } = req.body; // Obtener name_video del cuerpo de la solicitud
    cb(null, `${name_video}${path.extname(file.originalname)}`); // Usar name_video como nombre del archivo
  }
});

const upload = multer({ storage });



/**
 * @swagger
 * /video/create:
 *   post:
 *     summary: Crear un nuevo video
 *     tags: [Videos]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name_video:
 *                 type: string
 *               client_id:
 *                 type: string
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Video creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 response:
 *                   type: object
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
const createVideo = async (req, res) => {
  try {
    const { name_video, client_id } = req.body; // Obtener datos del cuerpo de la solicitud
    const file = req.file; // Obtener el archivo del FormData
    const link_video = `\\public\\video\\${client_id}\\${name_video}${path.extname(file.originalname)}`.replace(/\\/g, "\\");

    const newVideo = {
      name_video,
      client_id,
      link_video
    };

    // Guardar el video en la base de datos
    const response = await service_Video.create_video(newVideo);
    res.status(201).json({ success: true, response: response });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};


/**
 * @swagger
 * /video/updateVideo/{id}:
 *   put:
 *     summary: Actualizar un video
 *     tags: [Videos]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del video
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name_video:
 *                 type: string
 *               client_id:
 *                 type: string
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Video actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 response:
 *                   type: object
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
// Actualizar un video
const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name_video, client_id } = req.body; // Obtener datos del cuerpo de la solicitud
    let link_video;

    // Si se proporciona un nuevo archivo, actualizamos el archivo y el link_video
    if (req.file) {
      const file = req.file;
      link_video = `\\public\\video\\${client_id}\\${name_video}${path.extname(file.originalname)}`.replace(/\\/g, "\\");

      // Actualizar la ruta del archivo en el sistema de archivos si se proporciona un nuevo archivo
      const uploadDir = path.join(__dirname, "../public/video", client_id);
      fs.mkdirSync(uploadDir, { recursive: true });
      fs.renameSync(file.path, path.join(uploadDir, `${name_video}${path.extname(file.originalname)}`));
    } else {
      link_video = `\\public\\video\\${client_id}\\${name_video}`.replace(/\\/g, "\\");
    }

    const updatedVideo = {
      name_video,
      client_id,
      link_video
    };

    // Actualizar el video en la base de datos
    const response = await service_Video.update_video(id, updatedVideo);
    res.status(200).json({ success: true, response: response });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};



/**
 * @swagger
 * /video/delete/{id}:
 *   delete:
 *     summary: Eliminar un video
 *     tags: [Videos]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del video
 *     responses:
 *       200:
 *         description: Video eliminado exitosamente
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
 *       404:
 *         description: Video no encontrado
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
// Eliminar un video
const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    // Obtener el video a eliminar
    const video = await service_Video.single_video({ id });
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    // Eliminar el archivo del sistema de archivos
    const filePath = path.join(__dirname, `../${video.link_video}`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Eliminar el video de la base de datos
    await service_Video.delete_video(id);
    res.status(200).json({ success: true, message: 'Video deleted successfully' });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};

// Definición de rutas y funciones asociadas
router.get("/all", protected,listvideo); // Ruta para listar videos
router.post("/create",protected, upload.single("video"), createVideo); // Ruta para crear un nuevo video
router.get("/:id", singleVideo); // Ruta para obtener un video por ID
router.get("/clienteid/:client_id",protected,videosByClientId); // Ruta para obtener un video por ID de cliente
router.put("/updateVideo/:id",protected, upload.single("video"), updateVideo); // Ruta para actualizar un video
router.delete("/delete/:id",protected, deleteVideo); // Ruta para eliminar un video

module.exports = router; // Exportar el router de Express con las rutas definidas
