const jwt = require('jsonwebtoken');
require('dotenv').config();

const authToken = (req, res, next) => {
// get token from header
    const token = req.header('jwt_token');
// return if there is no token
    if (!token) {
        return res.status(403).json({msg: 'Token not found'});
    }
// verify token
    try {
        // this will give the profile id (profile:{id: profile.id})
        const verify = jwt.verify(token, process.env.jwtSecret);

        req.profile = verify.profile;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Invalid token'})
    }
}

module.exports = authToken;