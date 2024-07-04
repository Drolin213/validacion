// Importar el módulo de base de datos
const db = require("../db");

// Función para listar casos en la base de datos
const list_answers = async (params = {}) => {
    try {
        // Consultar la base de datos para seleccionar registros según los parámetros proporcionados
        const results = await db(process.env.T_ANSWERS)
            .where(params)  // Aplicar filtros de búsqueda opcionales
            .select();      // Seleccionar todos los campos de los registros encontrados
        return results ;  // Devolver éxito y los datos obtenidos
    } catch (error) {
        return { success: false, error: error.message };  // Devolver fallo y el mensaje de error si ocurre uno
    }
};

// Función para crear un nuevo registro en la tabla T_ANSWERS de la base de datos
const create_answers = async (obj) => {
    try {
        // Realizar la inserción en la tabla T_ANSWERS usando Knex
        const results = await db(process.env.T_ANSWERS).insert({
            response_1: obj.response_1,
            response_2: obj.response_2,
            cases_id: obj.case_id  // Asumiendo que `cases_id` es la columna correcta en la tabla `answers`
        });

        return { success: true, data: results };  // Devolver éxito y los datos del objeto insertado
    } catch (error) {
        return { success: false, error: error.message };  // Devolver fallo y el mensaje de error si ocurre uno
    }
};


// Función para obtener un solo caso de la base de datos por sus parámetros
const single_answers = async (params = {}) => {
    try {
        // Buscar y devolver el primer registro que coincida con los parámetros en la tabla T_ANSWERS
        const result = await db(process.env.T_ANSWERS)
            .where(params)
            .first(); // Utiliza .first() para obtener solo el primer resultado
        return result;  // Devolver el resultado encontrado
    } catch (error) {
        throw new Error(error.message);  // Lanzar un error con el mensaje correspondiente si ocurre un problema
    }
};

// Exportar las funciones para que estén disponibles para otros módulos
module.exports = { list_answers, create_answers, single_answers };
