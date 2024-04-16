const crypto = require('crypto');

const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};

const jwtSecretKey = generateSecretKey();
console.log(jwtSecretKey)