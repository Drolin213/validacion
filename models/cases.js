// Importar el módulo de base de datos
const db = require("../db");

// Función para listar casos en la base de datos
const list_case = async (params = {}) => {
    try {
        // Consultar la base de datos para seleccionar registros de casos y sus respuestas
        const results = await db(process.env.T_CASES, process.env.T_ANSWERS)
        .leftJoin(process.env.T_ANSWERS, `${process.env.T_CASES}.id`, `${process.env.T_ANSWERS}.cases_id`)
        .leftJoin(process.env.T_CLIENTS, `${process.env.T_CASES}.client_id`,`${process.env.T_CLIENTS}.client_id`)
        .select(`${process.env.T_CASES}.id`,`${process.env.T_CASES}.code_case`,`${process.env.T_CASES}.client_id`,`${process.env.T_CASES}.date`,`${process.env.T_CASES}.time`,`${process.env.T_ANSWERS}.response_1`,`${process.env.T_ANSWERS}.response_2`,`${process.env.T_CLIENTS}.client_name`);
        //Consulta join casos-respuestas
        return { success: true, cases: results};
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


// Función para obtener un solo video de la base de datos por sus parámetros
const cases_by_client_id = async (client_id) => {
    try {
      // Buscar todos los videos asociados al client_id
      const results = await db(process.env.T_CASES,process.env.T_ANSWERS,process.env.T_CLIENTS)
        .leftJoin(process.env.T_ANSWERS, `${process.env.T_CASES}.id`,`${process.env.T_ANSWERS}.cases_id`)
        .leftJoin(process.env.T_CLIENTS, `${process.env.T_CASES}.client_id`,`${process.env.T_CLIENTS}.client_id`)
        .select(`${process.env.T_CASES}.id`,`${process.env.T_CASES}.code_case`,`${process.env.T_CASES}.client_id`,`${process.env.T_CASES}.date`,`${process.env.T_CASES}.time`,`${process.env.T_ANSWERS}.response_1`,`${process.env.T_ANSWERS}.response_2`,`${process.env.T_CLIENTS}.client_name`)
        .where(`${process.env.T_CASES}.client_id`, client_id); 
      return results;  // Devolver todos los resultados encontrados
    } catch (error) {
      throw new Error(error.message);  // Lanzar un error con el mensaje correspondiente si ocurre un problema
    }
  };

// Exportar las funciones para que estén disponibles para otros módulos
module.exports = { list_case, create_case, single_case, cases_by_client_id };
