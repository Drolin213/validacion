// Importar el módulo de base de datos
const db = require("../db");

// Función para listar casos en la base de datos
const list_case = async (params = {}) => {
    try {
        // Consultar la base de datos para seleccionar registros según los parámetros proporcionados
        const results = await db(process.env.T_CASES)
            .where(params)  // Aplicar filtros de búsqueda opcionales
            .select();      // Seleccionar todos los campos de los registros encontrados
        return results ;  // Devolver éxito y los datos obtenidos
    } catch (error) {
        return { success: false, error: error.message };  // Devolver fallo y el mensaje de error si ocurre uno
    }
};

// Función para crear un nuevo caso en la base de datos
const create_case = async (obj) => {
    try {
        // Insertar el objeto proporcionado en la tabla T_CASES de la base de datos
        const results = await db(process.env.T_CASES).insert(obj);
        return results ;  // Devolver éxito y los datos del objeto insertado
    } catch (error) {
        return { success: false, error: error.message };  // Devolver fallo y el mensaje de error si ocurre uno
    }
};


// Función para obtener un solo caso de la base de datos por sus parámetros
const single_case = async (params = {}) => {
    try {
        // Buscar y devolver el primer registro que coincida con los parámetros en la tabla T_CASES
        const result = await db(process.env.T_CASES)
            .where(params)
            .first(); // Utiliza .first() para obtener solo el primer resultado
        return result;  // Devolver el resultado encontrado
    } catch (error) {
        throw new Error(error.message);  // Lanzar un error con el mensaje correspondiente si ocurre un problema
    }
};

// Exportar las funciones para que estén disponibles para otros módulos
module.exports = { list_case, create_case, single_case };
