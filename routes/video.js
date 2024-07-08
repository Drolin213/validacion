const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const service_Video = require("../models/video");

/* Función para listar todos los casos */
const listvideo = (req, res) => {
  service_Video.list_video()
      .then((response) => res.json({ success: true, response: response })) // Enviar respuesta JSON con los casos listados
      .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};

// Función para obtener un caso por ID
const singleVideo = (req, res) => {
  service_Video.single_video({ id: req.params.id }) // Llamar al servicio para obtener un caso por ID
    .then((response) => {
      if (response) {
        res.json({ response }); // Enviar respuesta JSON con el caso encontrado
      } else {
        res.status(404).json({ success: false, message: 'Case not found' }); // Enviar error 404 si no se encontró el caso
      }
    })
    .catch((e) => res.status(500).json({ success: false, error: e.message })); // Manejo de errores
};

// Función para obtener un caso por ID cliente
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
    const uploadDir = path.join(__dirname, "../public/videos", client_id); // Ruta donde se guardarán los archivos
    
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
router.get("/all", listvideo); // Ruta para crear un nuevo video
router.post("/create", upload.single("video"), createVideo); // Ruta para crear un nuevo video
router.get("/:id", singleVideo); // Ruta para obtener un caso por ID
router.get("/clienteid/:client_id", videosByClientId); // Ruta para obtener un Client_id por ID
router.put("/updateVideo/:id", upload.single("video"), updateVideo); // Ruta para actualizar un video
router.delete("/delete/:id", deleteVideo); // Ruta para eliminar un video

module.exports = router; // Exportar el router de Express con las rutas definidas
