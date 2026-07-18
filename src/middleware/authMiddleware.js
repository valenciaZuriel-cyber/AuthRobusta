const jwt = require('jsonwebtoken');

const verificarTokenGenerico = (req, res, next) => {
    const token = req.headers['app-token'];
    const decoded = jwt.decode(token);

    if (!token || !decoded || token !== process.env.App_token) {
        return res.status(401).json({ message: "Acceso denegado." });
    }

    next();
};

module.exports = verificarTokenGenerico;