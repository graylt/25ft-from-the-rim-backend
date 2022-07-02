// const express = require('express');
// const router = express.Router();
// const axios = require('axios');

// const db = require('../models')

// router.get('/', (req, res) => {
//     axios.get('https://www.balldontlie.io/api/v1/teams')
    // .then
    // .then (apiRes => {

        // res.render('/teams')
        // const apiJson = apiRes.data
        // const jsonArr = JSON.stringify(apiJson)
        // console.log(apiRes.data)
        // res.send(apiRes.data.data)

//         res.render('/teams', {apiRes: apiRes.data.data})
//     })
// });

// router.get('/:id', (req, res) => {
//     axios.get('https://www.balldontlie.io/api/v1/teams/${req.params.id}')
//     .then (apiRes => {
//         const abbreviation = apiRes.data.abbreviation
//         const city = apiRes.data.city
//         const conference = apiRes.data.conference
//         const division = apiRes.data.division
//         const full_name = apiRes.data.full_name
//         const name = apiRes.data.name

//         res.render('/teams', {abbreviation, city, conference, division, full_name, name})

//     })
// })

// module.exports = router