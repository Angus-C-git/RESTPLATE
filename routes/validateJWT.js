const jwt = require('jsonwebtoken');

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 *
 * Validate Auth Tokens
 */
module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        // JWT middleware
        req.user = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (err) {
        res.status(403).send('Invalid Token');
    }
}