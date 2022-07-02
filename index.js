/////////////////////////////////////////////////////////////////////////
// set up
/////////////////////////////////////////////////////////////////////////

const express = require('express');
const cors = require('cors');
// const axios = require('axios');
// const methodOverride = require('method-override');
// const pool = require('./db');
const app = express();
const path = require('path');
const postgres = require('./postgres.js');
const server = http.createServer(app);
// const bcrypt = require('bcrypt');
// const validInfo = require('./middleware/validInfo');
// const authorize = require('./middleware/authorize');
// const jwtGenerator = require('./utils/jwtGenerator');
// const jwt = require('jsonwebtoken');
require('dotenv').config();

//___________________
//Middleware
//___________________

// app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());



//Static
app.use(express.static('public'));

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'build')));
 


/////////////////////////////////////////////////////////////////////////
// routes
/////////////////////////////////////////////////////////////////////////

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
// });

// Authorization
/////////////////////////////////////////////////////////////////////////

const authController = require('./controllers/jwtAuth.js');
app.use('/auth', authController)

const testController = require('./controllers/test.js');
app.use('/test', testController)

// After defining your routes, anything that doesn't match what's above, we want to return index.html from our built React app


//___________________
//Initial Test route
//___________________

// app.get('/', (req, res)=> {
//   res.send('Hello world')
// })

/////////////////////////////////////////////////////////////////////////
// connection
/////////////////////////////////////////////////////////////////////////

postgres.connect();

// app.listen (3000, () => {
//     console.log('listening...');

// })

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/../client/build/index.html'))
// })

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });



app.listen(process.env.PORT || 3000, () => {
    console.log('listening...');
});

//___________________
//Listener
//___________________
// app.listen(PORT, () => console.log( 'Listening on port:', PORT));



/////////////////////////////////////////////////////////////////////////
// code graveyard
/////////////////////////////////////////////////////////////////////////

// non-controller routes
/////////////////////////////////////////////////////////////////////////

//test csv player db route
// app.get("/player", async (req, res) => {
//     try {
//       const allPlayers = await postgres.query("SELECT * FROM historical_player WHERE player_name = 'Kareem Abdul-Jabbar' ORDER BY player_name ASC");
//       res.json(allPlayers.rows);
//     } catch (err) {
//       console.error(err.message);
//     }
//   });


// app.post('/', (req, res) => {
//     const historicalPlayer = postgres.query(`INSERT INTO historical_player (player_name, player_id, season, poss, mp, raptor_offense, raptor_defense, raptor_total, war_total, war_reg_season, war_playoffs, predator_offense, predator_defense,  predator_total, pace_impact) VALUES (
//     '${req.body.player_name}', 
//     '${req.body.player_id}',
//     ${req.body.season},
//     ${req.body.poss},
//     ${req.body.mp},
//     ${req.body.raptor_offense},
//     ${req.body.raptor_defense},
//     ${req.body.raptor_total},
//     ${req.body.war_total},
//     ${req.body.war_reg_season},
//     ${req.body.war_playoffs},
//     ${req.body.predator_offense},
//     ${req.body.predator_defense},
//     ${req.body.predator_total},
//     ${req.body.pace_impact}
//     )`)
//      return res.json(historicalPlayer);
//         // } catch (err) {
//         //     console.error(err.message);
//         // }
// });

// route for dashboard

// app.post('/', authorize, async (req, res) => {
//     try {
//         const profile = await postgres.query(
//             'SELECT name FROM profiles WHERE id = $1', [req.id]
//         );

//         res.json(profile.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error')
//     }
// })

// // routes for authorization

// app.get('/profile', validInfo, async (req, res) => {
//     postgres.query('SELECT * FROM profiles ORDER BY id ASC;', (err, results) => {
//         res.json(results.rows)
//     });
// });

// //post/create
// app.post('/register', validInfo, async (req, res) => {
//     const {name, email, password} = req.body;
//     try {
//         const profile = await postgres.query('SELECT * FROM profiles WHERE email = $1', 
//         [email]
//         );

//         if (profile.rows.length > 0) {
//             return res.status(401).json('The profile already exists');
//         }

//         const salt = await bcrypt.genSalt(10);
//         const bcryptPassword = await bcrypt.hash(password, salt);

//         const newProfile = await postgres.query(  
//             `INSERT INTO profiles (name, email, password) VALUES ($1, $2, $3) RETURNING *`, 
//             [name, email, bcryptPassword]
//         );
    
//         // return res.json(newProfile);
//         // } catch (err) {
//         //     console.error(err.message);
//         // }


//         // const jwtToken = jwtGenerator(newProfile.rows[0].id);
//         const jwtToken = jwtGenerator(newProfile.rows[0]);

//         return res.json({jwtToken});
//     } catch (err) {
//             console.error(err.message);
//             return res.status(500).send('Server error')
//         }
    
//     });

// //login
// app.post('/login', validInfo, async (req, res) => {
//     const {email, password} = req.body;

//     try {
//         const profile = await postgres.query('SELECT * FROM profiles WHERE email = $1', [
//             email
//         ]);

//         if (profile.rows.length === 0) {
//             return res.status(401).json('Invalid email');
//         }
//         const validPassword = await bcrypt.compare(
//             password, 
//             profile.rows[0].password
//         );

//         if (!validPassword) {
//             return res.status(401).json('Invalid password')
//         }

//         const jwtToken = jwtGenerator(profile.rows[0].id);
//         return res.json({jwtToken});
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Internal server error');
//     }
// });

// //verify
// app.post('/verify', authorize, (req, res) => {
//     try {
//         res.json(true);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error')
//     }
// })

// //logout
// app.post('/logout', validInfo, async (req, res) => {
//     try {
//       return res.status(200).clearCookie('token', { httpOnly: true }).json({
//         success: true,
//         message: 'Logged out successfully',
//       })
//     } catch (error) {
//       console.log(error.message)
//       return res.status(500).json({
//         error: error.message,
//       })
//     }
// })

// alt versions of code not used
/////////////////////////////////////////////////////////////////////////


// app.post('/', (req, res) => {
//     const historicalPlayer = postgres.query(`INSERT INTO historical_player (player_name, player_id, season, poss, mp, raptor_offense, raptor_defense, raptor_total, war_total, war_reg_season, war_playoffs, predator_offense, predator_defense,  predator_total, pace_impact) VALUES (
//     '${req.body.player_name}', 
//     '${req.body.player_id}',
//     ${req.body.season},
//     ${req.body.poss},
//     ${req.body.mp},
//     ${req.body.raptor_offense},
//     ${req.body.raptor_defense},
//     ${req.body.raptor_total},
//     ${req.body.war_total},
//     ${req.body.war_reg_season},
//     ${req.body.war_playoffs},
//     ${req.body.predator_offense},
//     ${req.body.predator_defense},
//     ${req.body.predator_total},
//     ${req.body.pace_impact}
//     )`)
//      return res.json(historicalPlayer);
//         // } catch (err) {
//         //     console.error(err.message);
//         // }
// });

// app.post('/teams', async(req,res) => {
//     try {
//         console.log(req.body)
//     } catch (err) {
//         console.error(err.message)
//     }
// })

//controllers
// const teamController = require('./controllers/teams.js');
// app.use('/teams', teamController);

// const authenticationController = require('./controllers/jwtAuth.js');
// app.use('/authentication', authenticationController);

// app.use('/auth', require('./routes/jwtAuth'));


    // app.post('/signup', (req, res) => {
    // postgres.query(`INSERT INTO profiles (name, email, password) VALUES ($1, $2, $3) RETURNING *`, (err, results) => {
    // postgres.query(`INSERT INTO profiles (name, email, password) VALUES ('${req.body.name}, ${req.body.email}, ${req.body.password}) RETURNING *`, (err, results) => {
//         postgres.query('SELECT * FROM profiles ORDER BY id ASC;', (err, results) => {
//             res.json(results.rows)
//             console.log(err);
//         });
//     })
// });

/////////////////////////////////////////////////////////////////////////
// code graveyard DELETE
/////////////////////////////////////////////////////////////////////////

//    app.delete('/:id', (req, res) => {
//     const {id} = req.params;
//         postgres.query(`DELETE FROM profiles WHERE id = ${id}`,['id'], (err, results) => {
//             postgres.query('SELECT * FROM profiles ORDER BY id ASC;', (err, results) => {
//                 res.json(results.rows)
//             });
//         });
//     });


    // app.delete('/:id', validInfo, async (req, res) => {
    //     try {
    //       const {id} = req.params;
    //       const deleteProfile = await postgres.query(`DELETE FROM profiles WHERE id = $1`, 
    //       [id]);
    //       res.json(deleteProfile);
    //     } catch (err) {
    //       console.log(err.message);
    //     }
    //   });

    // app.delete('/:id', (req, res) => {
    //     postgres.query(`DELETE FROM profiles WHERE id = ${req.params.id};`, (err, results) => {
    //         postgres.query('SELECT * FROM profiles ORDER BY id ASC;', (err, results) => {
    //             res.json(results.rows)
    //         });
    //     });
    // });

    // app.delete('/:id', validInfo, async (req, res) => {
    //     try {
    //         const {id} = req.params;
    //         const deleteProfile = await postgres.query( 
    //             `DELETE FROM profiles WHERE id = ${'id'}`
    //         );

    //         return res.json(deleteProfile);
    //         } catch (err) {
    //             console.error(err.message);
    //         }
    
    //     });

    // app.delete('/:id/', validInfo, async (req, res) => {
    //     const {id} = req.params;
    
    //     try {
    //         const deleteProfile = await postgres.query(`DELETE FROM profiles WHERE id = ${id};`, [id])
        //     res.status(200).send('Profile has been deleted')
        // } catch (err) {
        //     console.error(err.message);
        //     res.status(500).send('Failed to delete profile')
        // }
    //     return res.json(deleteProfile);
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // });

// app.delete('/:id', validInfo, async (req, res) => {
//    try {
//     const {id} = req.params;
//     const deleteProfile = await postgres.query( 
//         `DELETE FROM profiles WHERE id = ${id}`,
//         [id] 
//     );

//     return res.json(deleteProfile);
//     } catch (err) {
//         console.error(err.message);
//     }
// });
        // app.delete('/:id', (req, res) => {
        //     const {id} = req.params;
        //     // const deleted = profiles.find(profile => profile.id === id)
        //     postgres.query(`DELETE FROM profiles WHERE id = ${id};`, (err, results) => {
        //         postgres.query('SELECT * FROM profiles ORDER BY id ASC;', (err, results) => {
        //             res.json(results.rows)
        //         });
        //     });
        // });

         // app.delete('/:id', validInfo, async (req, res) => {
    //     const {id} = req.params;

    //     try {
    //         postgres.query(`DELETE FROM profiles WHERE id = ${id};`, [id])
    //         res.status(200).send('Profile has been deleted')
    //     } catch (err) {
    //         console.error(err.message);
    //         res.status(500).send('Failed to delete profile')
    //     }
    // });

/////////////////////////////////////////////////////////////////////////
// code graveyard EDIT
/////////////////////////////////////////////////////////////////////////

    // app.put('/:id', validInfo, async (req, res) => {
    //     try {
    //         const {name, id} = req.params;
    
    //         const updateProfile = await postgres.query( 
    //             `UPDATE profiles SET name = ${name} WHERE id = ${'id'}`,
    //             // [name]
    //         );
        
    //         return res.json(updateProfile);
    //         } catch (err) {
    //             console.error(err.message);
    //         }

    // app.put('/:id', (req, res) => {
    //     const {id} = req.params;
    //     const {name} = req.params;
    //     postgres.query(`UPDATE profiles SET name = '${name}' WHERE id = ${'id'}`, (err, results) => {
    //         postgres.query('SELECT * FROM profiles ORDER BY id ASC;', (err, results) => {
    //             res.json(results.rows)
    //         });
    //     })
    // });

    // app.put('/:id', validInfo, async (req, res) => {
    //     try {
    //         const {id} = req.params;
    //         const {name} = req.params;
    //         const updateProfile = await postgres.query(`UPDATE profiles SET name = ${'name'} WHERE id = ${'id'}`, 
    //         // ['name', 'id']
    //         );
    //         res.json(updateProfile);
    //     } catch (err){
    //         console.error(err.message)
    //     }
    // });
