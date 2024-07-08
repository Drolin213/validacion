const db = require("../db");

// Función para listar casos en la base de datos
const list_video = async (params = {}) => {
  try {
      // Consultar la base de datos para seleccionar registros según los parámetros proporcionados
      const results = await db(process.env.T_VIDEOS)
          .where(params)  // Aplicar filtros de búsqueda opcionales
          .select();      // Seleccionar todos los campos de los registros encontrados
      return results ;  // Devolver éxito y los datos obtenidos
  } catch (error) {
      return { success: false, error: error.message };  // Devolver fallo y el mensaje de error si ocurre uno
  }
};


// Función para crear un nuevo video en la base de datos
const create_video = async (obj) => {
  try {
    // Insertar el objeto proporcionado en la tabla T_VIDEOS de la base de datos
    const results = await db(process.env.T_VIDEOS).insert(obj);
    // Devolver éxito y los datos del objeto insertado
    return {
      name_video: obj.name_video,
      link_video: obj.link_video
    };
  } catch (error) {
    return { success: false, error: error.message };  // Devolver fallo y el mensaje de error si ocurre uno
  }
};

// Función para obtener un solo video de la base de datos por sus parámetros
const single_video = async (params = {}) => {
  try {
    // Buscar y devolver el primer registro que coincida con los parámetros en la tabla T_VIDEOS
    const result = await db(process.env.T_VIDEOS)
      .where(params)
      .first(); // Utiliza .first() para obtener solo el primer resultado
    return result;  // Devolver el resultado encontrado
  } catch (error) {
    throw new Error(error.message);  // Lanzar un error con el mensaje correspondiente si ocurre un problema
  }
};
// Función para obtener un solo video de la base de datos por sus parámetros
const single_video_Id_clienst = async (params = {}) => {
  try {
    // Buscar y devolver el primer registro que coincida con los parámetros en la tabla T_VIDEOS
    const result = await db(process.env.T_VIDEOS)
      .where(params)
      .first(); // Utiliza .first() para obtener solo el primer resultado
    return result;  // Devolver el resultado encontrado
  } catch (error) {
    throw new Error(error.message);  // Lanzar un error con el mensaje correspondiente si ocurre un problema
  }
};


// Función para actualizar un video en la base de datos por su ID
const update_video = async (id, obj) => {
  try {
    // Actualizar el video que coincide con el ID proporcionado con los nuevos datos del objeto
    const results = await db(process.env.T_VIDEOS)
      .where({ id })
      .update(obj);
    // Verificar si se actualizó algún registro
    if (results) {
      return { success: true, message: 'Video updated successfully' };
    } else {
      return { success: false, message: 'Video not found' };
    }
  } catch (error) {
    return { success: false, error: error.message };  // Devolver fallo y el mensaje de error si ocurre uno
  }
};

// Función para eliminar un video de la base de datos por su ID
const delete_video = async (id) => {
  try {
    // Eliminar el video que coincide con el ID proporcionado
    const results = await db(process.env.T_VIDEOS)
      .where({ id })
      .del();
    // Verificar si se eliminó algún registro
    if (results) {
      return { success: true, message: 'Video deleted successfully' };
    } else {
      return { success: false, message: 'Video not found' };
    }
  } catch (error) {
    return { success: false, error: error.message };  // Devolver fallo y el mensaje de error si ocurre uno
  }
};

module.exports = { list_video, create_video, single_video, update_video, delete_video };
