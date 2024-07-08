// userModel.js

const db = require('../db');
const bcrypt = require('bcryptjs');

// Función para autenticar un usuario
const authenticateUser = async (name_user, password) => {
    try {
        // Consultar la base de datos para verificar el usuario por nombre de usuario
        const user = await db('users')
            .where({ name_user })
            .first();

        if (!user) {
            return { success: false, message: 'Credenciales inválidas: Usuario no encontrado' };
        }



        // Verificar la contraseña utilizando bcrypt
        const isMatch = bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return { success: false, message: 'Credenciales inválidas: Contraseña incorrecta' };
        }

        // Devolver la respuesta exitosa con los datos del usuario (sin incluir la contraseña)
        return {
            success: true,
            user: {
                id_user: user.id_user,
                name_user: user.name_user,
                access_Token: user.access_Token,
                rol_id: user.rol_id,
                client_id: user.client_id 
            }
        };

    } catch (error) {
        console.error('Error en la autenticación:', error);
        return { success: false, message: 'Error en la autenticación' };
    }
};

module.exports = { authenticateUser };
