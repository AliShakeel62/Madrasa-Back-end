const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; 
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', req.headers);
    if (!authHeader || !authHeader.startsWith('Bearer ' )) {
        console.log('Error: Authorization header missing or incorrect format.');
        return res.status(401).json({ 
            message: 'Access Denied. Token missing or malformed.' 
        });
    }
    const token = authHeader.split(' ')[1]; 
    
    if (!token) {
        console.log('Error: Token is undefined after split.');
        return res.status(401).json({ 
            message: 'Access Denied. Token missing.' 
        });
    }
    try {
        const decodedUser = jwt.verify(token, JWT_SECRET);
        req.user = decodedUser; 
        next(); 
    } catch (err) {
        console.error('JWT Verification Failed:', err.message);
        return res.status(403).json({ 
            message: 'Invalid Token. Please log in again.',
            error: err.message 
        });
    }
};

module.exports = authenticateToken;