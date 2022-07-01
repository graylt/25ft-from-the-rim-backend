
const jwt = require('jsonwebtoken');
const postgres = require('../postgres.js');
require('dotenv').config();

// module.exports = function(req, res, next) {

//     // get token from header
//     const token = req.header('jwt_token');
//     // return if there is no token
//         if (!token) {
//             return res.status(403).json({msg: 'Token not found'});
//         }
//     // verify token
//         try {
//             // this will give the profile id (profile:{id: profile.id})
//             const verify = jwt.verify(token, `${process.env.jwtSecret}`);
    
//             req.profile = verify.profile;
//             next();
//         } catch (err) {
//             res.status(401).json({msg: 'Invalid token'})
//         }

// }

module.exports = async (req, res, next) => {
    console.log(req.header('token'));
    console.log('token?')
    // try {
        const jwtToken = req.header('token');

        if (!jwtToken) {
            return res.status(403).json('Token not found')
        }
        try {
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);

        req.profile = payload.profile;

        next();
    } catch (err) {
        console.error(err.message);
        return res.status(403).json('Invalid token')
    }
}

// module.exports = async (req, res, next) => {
//     try {
//       jwt.verify(
//         // req.cookies.t,
//         process.env.jwtSecret,
//         (err, decoded) => {
//           if (err) {
//             return res.status(401).json({
//               message: "Unauthorized",
//             });
//           } else {
//             req.profile = decoded.profile;
//             next();
//           }
//         }
//       );
//     } catch (error) {
//       throw error;
//     }
//   };


/////////////////////////////////////////////////////////////////////////
// code graveyard
/////////////////////////////////////////////////////////////////////////

// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const authToken = (req, res, next) => {
// // get token from header
//     const token = req.header('jwt_token');
// // return if there is no token
//     if (!token) {
//         return res.status(401).json({msg: 'Token not found'});
//     }
// // verify token
//     try {
//         // this will give the profile id (profile:{id: profile.id})
//         const profile = jwt.verify(token, `${process.env.jwtSecret}`);

//         req.profile = verify.email;
//         next();
//     } catch (err) {
//         res.status(403).json({msg: 'Invalid token'})
//     }
// }

// module.exports = authToken




// require('dotenv').config();
// const jwt = require("jsonwebtoken");

// verifyToken = (req, res, next) => {
//     let token = req.headers['jwt_token']

//     if (!token) {
//                     return res.status(403).json({msg: 'Token not found'});
//                 }

//     jwt.verify(token, `${process.env.jwtSecret}`, (err, decoded) => {
//     } catch (err) {
//         //             res.status(401).json({msg: 'Invalid token'})
//         //         }
//         req.id = decoded.id;
//         next()
//     })
// }

// const authJwt = {
//     verifyToken: verifyToken
// }

// module.exports = authJwt;



