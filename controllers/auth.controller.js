const jwt = require('jsonwebtoken');
JWT_SECRET_KEY = "af7b27405f54568dcbac140a9ee075967a1aacc9b0c25803afb235366cb0168b"

const authenticateProtection = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
};

module.exports = authenticateProtection;