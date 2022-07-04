
const jwt = require('jsonwebtoken');
const config = require("../config/authConfig.js");
require('dotenv').config();

// module.exports = async (req, res, next) => {
//     // console.log(req.header('token'));
//     // console.log('token?')
//     // try {
// // get token from header
//         const jwtToken = req.header('token');
//  // return if there is no token
//         if (!jwtToken) {
//             return res.status(403).json('Token not found')
//         }
// // verify token
//         try {
// // this will give the profile id (profile:{id: profile.id})
//         const payload = jwt.verify(jwtToken, config.secret);

//         // req.profile = payload.profile;
//         req.id = payload.id;

//         next();
//     } catch (err) {
//         console.error(err.message);
//         return res.status(403).json('Invalid token')
//     }
// }

function authToken(req, res, next) {
    const authHeader = req.headers['jwtToken']
    const jwtToken = authHeader && authHeader.split(' ')[1]
  
    if (jwtToken == null) return res.sendStatus(401)
  
    jwt.verify(jwtToken, config.secret, (err, decoded) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.profile = decoded
  
      next()
    })
  }

module.exports = authToken;

/////////////////////////////////////////////////////////////////////////
// code graveyard
/////////////////////////////////////////////////////////////////////////

// verifyToken = (req, res, next) => {
// let token = req.headers('access-token');

// if (!token) {
//     return res.status(403).json(
//          'Token not found'
//     )
// }

// // verify token
// jwt.verify(token, config.secret, (err, decoded) => {
//     if (err) {
//         return res.status(401).json(
//          'Invalid token'
//         )
//     }
//     req.id = decoded.id;
//     next();
// })

// };

// const authJwt = {
//     verifyToken: verifyToken
// }

// module.exports = authJwt;

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



