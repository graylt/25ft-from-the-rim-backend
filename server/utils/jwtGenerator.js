const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtGenerator = (id) => {
    const payload = {
        profile: {
            id: id
        }
};

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: '60s'});
}

module.exports = jwtGenerator;