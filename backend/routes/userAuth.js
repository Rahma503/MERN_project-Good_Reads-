const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access Denied');
    };

    jwt.verify(token, "bookstore123", (err, user) => {
        if (err) {
            return res.status(403).send('Invalid Token')
        };
        req.user = user; // Store the user data in request
        next();
    });
}

module.exports = { authToken };

