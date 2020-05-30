const jwt = require('jsonwebtoken');
const secretKey = 'ksdjfhsdbfkjsb';
const algorithm = 'HS256';
function generateToken(user) {
    const token = jwt.sign(user, secretKey, { algorithm, expiresIn: '1h' });
    return token;
}

function decodeTokenValue(token, cb) {
    jwt.verify(token, secretKey, cb);
}

module.exports = {
    generateToken, decodeTokenValue
}