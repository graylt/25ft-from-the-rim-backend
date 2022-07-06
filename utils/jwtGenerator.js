const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtGenerator = (id) => {
    const payload = {
        profile: {
            id: id
        }
};

// const payload = {
//     profile: id
// }

    return jwt.sign(payload, 
        `${process.env.jwtSecret}`, 
        {expiresIn: '1h'});
}

module.exports = jwtGenerator;