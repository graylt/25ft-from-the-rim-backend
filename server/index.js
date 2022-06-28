/////////////////////////////////////////////////////////////////////////
// set up
/////////////////////////////////////////////////////////////////////////

const express = require('express');
const cors = require('cors');
// const axios = require('axios');
// const methodOverride = require('method-override');
// const pool = require('./db');
const postgres = require('./postgres.js');
const bcrypt = require('bcrypt');
const validInfo = require('./middleware/validInfo');

require('dotenv').config();

const app = express();
require('dotenv').config();

//___________________
//Middleware
//___________________

app.use(express.json());
app.use(cors());

app.use(express.static('public'));
// app.use(express.urlencoded({extended: false}));
// app.use(methodOverride('_method'));

/////////////////////////////////////////////////////////////////////////
// routes
/////////////////////////////////////////////////////////////////////////

// get

//post/create
app.post('/signup', validInfo, async (req, res) => {
    try {
        const {email, name, password} = req.body;
        // const profile = await pool.query('SELECT * FROM profiles WHERE email = $1', 
        // [email]
        // );

        // if (profile.rows.length > 0) {
        //     return res.status(401).json('The profile already exists');
        // }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newProfile = await postgres.query(
            // 'INSERT INTO profiles (name, email,) VALUES ($1) RETURNING *', 
            'INSERT INTO profiles (name, email, password) VALUES ($1, $2, $3) RETURNING *', 
            // [name]
            [name, email, bcryptPassword]
        );
        res.json(newProfile)
} catch (err) {
            console.error(err.message);
}
        // const jwtToken = jwtGenerator(newProfile.rows[0].id);

        // return res.json({jwtToken})
        // } catch (err) {
        //     console.error(err.message);
        //     res.status(500).send('Server error');
        // }
    });


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