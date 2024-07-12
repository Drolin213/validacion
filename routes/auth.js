const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const protected = require('../middleware/authMIddleware'); // Importa el middleware de autenticación

// Ruta para refresh del token
router.post('/refresh',protected, (req, res) => {
    const refreshToken = req.cookies.access_token; // Obtén el refreshToken desde la cookie

    if (!refreshToken) {
        return res.status(403).json({ success: false, message: 'Refresh token not provided' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.SECRET_JWT_KEY);

        // Genera un nuevo accessToken
        const accessToken = jwt.sign(
            { name_user: decoded.name_user, id: decoded.id, rol_id: decoded.rol_id },
            process.env.SECRET_JWT_KEY,
            { expiresIn: '1h' }
        );

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'

        });

        res.json({ success: true, accessToken });
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }
});

module.exports = router;
