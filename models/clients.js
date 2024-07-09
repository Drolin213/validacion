// Importar el módulo de base de datos
const db = require("../db");

// Función para listar casos en la base de datos
const list_clients = async (params = {}) => {
    try {
        // Consultar la base de datos para seleccionar registros según los parámetros proporcionados
        const results = await db(process.env.T_CLIENTS)
            .where(params)  // Aplicar filtros de búsqueda opcionales
            .select();      // Seleccionar todos los campos de los registros encontrados
        return {succes:true, results} ;  // Devolver éxito y los datos obtenidos
    } catch (error) {
        return { success: false, error: error.message };  // Devolver fallo y el mensaje de error si ocurre uno
    }
};

/* // Función para crear un nuevo caso en la base de datos
const create_user = async (obj) => {
    try {
        // Insertar el objeto proporcionado en la tabla T_USERS de la base de datos
        const results = await db(process.env.T_USERS).insert(obj);
        return results ;  // Devolver éxito y los datos del objeto insertado
    } catch (error) {
        return { success: false, error: error.message };  // Devolver fallo y el mensaje de error si ocurre uno
    }
};


// Función para obtener un solo caso de la base de datos por sus parámetros
const single_user = async (params = {}) => {
    try {
        // Buscar y devolver el primer registro que coincida con los parámetros en la tabla T_USERS
        const result = await db(process.env.T_USERS)
            .where(params)
            .first(); // Utiliza .first() para obtener solo el primer resultado
        return result;  // Devolver el resultado encontrado
    } catch (error) {
        throw new Error(error.message);  // Lanzar un error con el mensaje correspondiente si ocurre un problema
    }
}; */

// Exportar las funciones para que estén disponibles para otros módulos
module.exports = { list_clients };
