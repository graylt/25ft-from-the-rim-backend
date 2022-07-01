const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator (id) {
    const payload = {
        profile: {
            id: id
        }
};

// const payload = {
//     profile: id
// }

    return jwt.sign(payload, `${process.env.jwtSecret}`, {expiresIn: '60s'});
}

module.exports = jwtGenerator;