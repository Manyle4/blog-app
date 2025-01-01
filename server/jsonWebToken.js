const jwt = require('jsonwebtoken');
const SECRET_KEY = require('./config.js');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    jwt.verify(token, SECRET_KEY, {}, async (err, data) => {
        if(err){
            res.status(403).json("Token is Invalid!");
        }
        req.userId = data._id
        next()
    })
}

module.exports = verifyToken;