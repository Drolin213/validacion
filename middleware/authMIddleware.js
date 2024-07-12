
const jwt = require('jsonwebtoken');
const protected = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(403).send('Access not authorized');
    }
    try {
        const data = jwt.verify(token, process.env.SECRET_JWT_KEY);
        req.user = data;
        next();
    } catch (error) {

        return res.status(401).json({ success: false, message: 'Invalid access token' });

      /*   if (error.name === 'TokenExpiredError') {
           
            const refreshToken = req.cookies.refresh_token; // RefreshToken desde la cookie

            if (!refreshToken) {
                return res.status(401).json({ success: false, message: 'Refresh token not provided' });
            }

            try {
                const decodedRefresh = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN_KEY);

                // Generar un nuevo accessToken
                const newAccessToken = jwt.sign(
                    { name_user: decodedRefresh.name_user, id: decodedRefresh.id, rol_id: decodedRefresh.rol_id },
                    process.env.SECRET_JWT_KEY,
                    { expiresIn: '15s' }
                );

                // Actualizar la cookie de accessToken
                res.cookie('access_token', newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                });

                // Agregar datos del usuario al request (opcional)
                req.user = decodedRefresh;

                // Continuar con la solicitud
                next();
            } catch (error) { */
               
            
        
            
        }
 
};



module.exports = protected;