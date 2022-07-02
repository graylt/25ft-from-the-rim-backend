const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// const pool = require('../db');
// const authConfig = require("../config/authConfig");
const validInfo = require('../middleware/validInfo');
const jwtGenerator = require('../utils/jwtGenerator');
const authorize = require('../middleware/authorize');
const postgres = require('../postgres.js');

// route for dashboard
router.post('/', authorize, async (req, res) => {
    try {
        const profile = await postgres.query(
            'SELECT name FROM profiles WHERE id = $1', 
            [req.id]
        );

        res.json(profile.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(
            'Server error'
            )
    }
})

// routes for authorization
router.get('/profile', validInfo, async (req, res) => {
    res.render('index.ejs');
    postgres.query('SELECT * FROM profiles ORDER BY id ASC;', 
    (err, results) => {
        res.json(results.rows)
    });
});

//post/create
router.post('/register', validInfo, async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const profile = await postgres.query('SELECT * FROM profiles WHERE email = $1', 
        [email]
        );

        if (profile.rows.length > 0) {
            return res.status(401).json(
                'The profile already exists'
                );
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newProfile = await postgres.query(  
            `INSERT INTO profiles (name, email, password) VALUES ($1, $2, $3) RETURNING *`, 
            [name, email, bcryptPassword]
        );
    
        // return res.json(newProfile);
        // } catch (err) {
        //     console.error(err.message);
        // }

        const jwtToken = jwtGenerator(newProfile.rows[0].id);

        return res.json({jwtToken});
    } catch (err) {
            console.error(err.message);
            return res.status(500).send(
                'Server error'
                )
        }
    });

//login
router.post('/login', validInfo, async (req, res) => {
    const {email, password} = req.body;

    try {
        const profile = await postgres.query('SELECT * FROM profiles WHERE email = $1', 
        [email]
        );

        if (profile.rows.length === 0) {
            return res.status(401).json(
                'Invalid email'
                );
        }
        const validPassword = await bcrypt.compare(
            password, 
            profile.rows[0].password
        );

        if (!validPassword) {
            return res.status(401).json(
                'Invalid password'
                )
        }

        const jwtToken = jwtGenerator(profile.rows[0].id);
        return res.json({jwtToken});
    } catch (err) {
        console.error(err.message);
        res.status(500).send(
            'Internal server error'
            );
    }
});

//verify
router.post('/verify', authorize, (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(
            'Server error'
            )
    }
})

//logout
router.post('/logout', validInfo, async (req, res) => {
    try {
      return res.status(200).clearCookie(
        'token', 
        { httpOnly: true })
        .json({
        success: true,
        message: 
        'Logged out successfully',
      })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({
        error: error.message,
      })
    }
})

router.put('/:id', validInfo, async (req, res) => {
    const {name} = req.body;
    const {id} = req.params;
    try {
            const updateProfile = await postgres.query( 
                `UPDATE profiles SET name = '${name}' WHERE id = ${id}`,
                // [name, id]
            );
            return res.json(updateProfile);
            } catch (err) {
                console.error(err.message);
                res.status(500).json(
                    'Unable to update'
                    )
    }
})

router.delete('/:id', validInfo, async (req, res) => {
    const {id} = req.params;
    try {
        const deleteProfile = await postgres.query(
            `DELETE FROM profiles WHERE id = ${id}`,
        );
        res.json(deleteProfile);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(
            'Unable to delete'
            )
    }
})


module.exports = router;

/////////////////////////////////////////////////////////////////////////
// code graveyard
/////////////////////////////////////////////////////////////////////////

//create a profile
// router.post('/signup', validInfo, async (req, res) => {
//     const {email, name, password} = req.body
//     try {
//         const profile = await pool.query('SELECT * FROM profiles WHERE email = $1', [email
//         ]);

//         if (profile.rows.length > 0) {
//             return res.status(401).json('The profile already exists');
//         }

//         const salt = await bcrypt.genSalt(10);
//         const bcryptPassword = await bcrypt.hash(password, salt);

//         let newProfile = await pool.query(
//             'INSERT INTO profiles (name, email, password) VALUES ($1, $2, $3) RETURNING *', 
//             [name, email, bcryptPassword]
//         );

//         const jwtToken = jwtGenerator(newProfile.rows[0].id);

//         return res.json({jwtToken})
//         } catch (err) {
//             console.error(err.message);
//             res.status(500).send('Server error');
//         }
//     });

// router.post('/signup', (req, res) => {
//     postgres.query(`INSERT INTO profiles (name, email, password) VALUES ('${req.body.name}, ${req.body.email}, ${req.body.password}) RETURNING *`, (err, results) => {
//         postgres.query('SELECT * FROM profiles ORDER BY id ASC;', (err, results) => {
//             res.json(results.rows)
//         });
//     })
// });



//profile
// router.get('/profile', (req, res) => {
//     if (req.profile) {
//         return res.json(req.profile);
//     } else {
//         return res.json({});
//     }
// })

// // log in
// router.post('/login', validInfo, async (req, res) => {
//     const {email, password} = req.body;

//     try {
//         const profile = await pool.query('SELECT * FROM profiles WHERE email = $1', [
//             email
//         ]);

//         if (profile.rows.length === 0) {
//             return res.status(401).json('Invalid login');
//         }

//         const validPassword = await bcrypt.compare(
//             password, 
//             profile.rows[0].password
//         );

//         if (!validPassword) {
//             return res.status(401).json('Invalid login')
//         }

//         const jwtToken = jwtGenerator(user.rows[0].id);
//         return res.json({jwtToken});
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Internal server error');
//     }
// });

// //verify log in
// router.post('/verify', authorize, (req, res) => {
//     try {
//         res.json(true);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Internal server error')
//     }
// });

// //logout
// router.delete('/logout',(req, res, next) => {
//         res.status(500).send('204')
// });

// //update profile
// router.put('/:id', validInfo, async (req, res) => {
//     const {password} = req.params;

//     try {
//         const profile = await pool.query(`DELETE FROM profiles WHERE id = ${req.params.password};`, [password])
//         res.status(200).send('Password has been updated')
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Failed to update password')
//     }
// });

// //delete profile
// router.delete('/:id', validInfo, async (req, res) => {
//     const {id} = req.params;

//     try {
//         const profile = await pool.query(`DELETE FROM profiles WHERE id = ${req.params.id};`, [id])
//         res.status(200).send('Profile has been deleted')
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Failed to delete profile')
//     }
// });

// router.delete('/:id', validInfo, (req, res) => {
//     postgres.query(`DELETE FROM profiles WHERE id = ${req.params.id};`, (err, results) => {
//         postgres.query('SELECT * FROM profiles ORDER BY id ASC;', (err, results) => {
//             res.json(results.rows)
//         });
//     });
// });


// module.exports = router;