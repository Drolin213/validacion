const db = require('../db');

// Función para autenticar un usuario
const authenticate_user = async (name_user, password) => {
    try {
        // Consultar la base de datos para verificar el usuario y la contraseña
        const user = await db('users')
            .where({ name_user, password })
            .first();

        // Si el usuario existe, devolver los datos del usuario
        if (user) {
            return { success: true, data: user };
        } else {
            // Si no se encuentra el usuario, devolver un mensaje de error
            return { success: false, message: 'Credenciales inválidas' };
        }
    } catch (error) {
        // Manejar cualquier error que ocurra durante la consulta
        return { success: false, message: error.message };
    }
};

module.exports = { authenticate_user };
