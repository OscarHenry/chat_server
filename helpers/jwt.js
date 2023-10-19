const res = require('express/lib/response');
const jwt = require('jsonwebtoken');

// generate JWT
const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        var payload = { uid };
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                // couldn't create token
                reject('Couldn\'t create token');
            } else {
                resolve(token);
            }
        });
    });

};

module.exports = { generateJWT };