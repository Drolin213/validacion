// Importar el módulo de base de datos
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

// Función para crear un nuevo caso en la base de datos
const create_video = async (obj) => {
    try {
        // Insertar el objeto proporcionado en la tabla T_VIDEOS de la base de datos
        const results = await db(process.env.T_VIDEOS).insert(obj);
        return results ;  // Devolver éxito y los datos del objeto insertado
    } catch (error) {
        return { success: false, error: error.message };  // Devolver fallo y el mensaje de error si ocurre uno
    }
};


// Función para obtener un solo caso de la base de datos por sus parámetros
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

// Función para actualizar un caso existente en la base de datos
const update_video = async (params, obj) => {
    try {
        // Actualizar registros en la tabla T_VIDEOS que coincidan con los parámetros proporcionados
        const results = await db(process.env.T_VIDEOS).where(params).update(obj);
        return results ;  // Devolver éxito y los datos de la operación de actualización
    } catch (error) {
        return { success: false, error: error.message };  // Devolver fallo y el mensaje de error si ocurre uno
    }
};
// Exportar las funciones para que estén disponibles para otros módulos
module.exports = { list_video, create_video, single_video, update_video };
