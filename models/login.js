const db = require('../db');
const bcrypt = require('bcryptjs');
// Función para encriptar la contraseña del usuario
// Verificar la contraseña utilizando bcrypt
const isMatch = (password, hashedPassword) => {
    const match =  bcrypt.compareSync(password, hashedPassword);
    return match;
};


const authenticateUser = async (name_user, password) => {
    try {
        // Obtener el usuario de la base de datos
        const user = await db('users').where({ name_user }).first();
        if (!user) {
            return { success: false, message: 'Credenciales inválidas: Usuario no encontrado' };
        }

        // Comparar la contraseña proporcionada con la contraseña hasheada almacenada en la base de datos
        const match =  isMatch(password, user.password);
              
              if (match === true) {
            return {
                success: true,
                user: {
                    id_user: user.id_user,
                    name_user: user.name_user,
                    rol_id: user.rol_id,
                    client_id: user.client_id
                }
            };
        } else {
            return { success: false, message: 'Credenciales inválidas: Contraseña incorrecta' };
        }
    } catch (error) {
        console.error('Error en authenticateUser:', error);
        return { success: false, message: 'Error al autenticar usuario' };
    }
};

module.exports = { authenticateUser };
