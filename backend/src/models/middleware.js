const jsonWebToken = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        jsonWebToken.verify(token, '123');
        next();
    } catch (error) {
        res.status(401).send(error.message);
    }
}

module.exports = authMiddleware
