const { decodeTokenValue } = require('../utils');
const multer=require('multer');
const upload=multer({dest:'public/'});



function serverError(res) {
    return res.status(500).json({ message: 'something went wrong.' });
}

function unAuthorizedRequest(res) {
    return res.status(401).json({ message: 'Unauthorized request' })
}

function badRequest(res, data) {
    res.status(400).json(data);
}
function verifyAuthentication(req, res, next) {
    const { authorization } = req.headers;
    console.log(authorization);
    const token = authorization.split(" ")[1];
    decodeTokenValue(token, (err, user) => {
        if (err && err.name === 'TokenExpiredError') {
            unAuthorizedRequest(res);
        } else if (user && user.email) {
            next();
        } else {
            serverError(res);
        }
    });
}

function checkHeaderValues(req, res, next) {
    const { headers } = req;
    if (headers && headers.authorization) {
        next();
    }
    else {
        badRequest(res, { message: 'missing headers' });
    }
}
module.exports = { checkHeaderValues, verifyAuthentication ,upload}