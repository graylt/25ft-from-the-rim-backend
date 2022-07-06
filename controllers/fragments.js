const express = require('express');
const router = express.Router();
const postgres = require('../postgres.js');


router.get('/', (req, res) => {
    postgres.query('SELECT * FROM fragments ORDER BY date ASC;', (err, results) => {
        res.send(results)
    });
});

router.post("/add", async (req, res) => {
    try {
      const { date } = req.body;
      const { movie } = req.body;
      const { short } = req.body;
      const { tv_series } = req.body;
      const { book } = req.body;
      const { play } = req.body;
      const { short_story } = req.body;
      const newCMS = await postgres.query(
        "INSERT INTO fragments (date, movie, short, tv_series, book, play, short_story) VALUES ($1, $2 ,$3, $4, $5, $6, $7) RETURNING *",
        [date, movie, short, tv_series, book, play, short_story]
      );
  
      res.json(newCMS.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

router.delete('/delete/:id', (req, res) => {
    postgres.query(`DELETE FROM fragments WHERE id = ${req.params.id};`, (err, results) => {
        postgres.query('SELECT * FROM fragments ORDER BY id ASC;', (err, results) => {
            res.json(results.rows)
        });
    });
});

router.put("/update/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { date } = req.body;
      const { movie } = req.body;
      const { short } = req.body;
      const { tv_series } = req.body;
      const { book } = req.body;
      const { play } = req.body;
      const { short_story } = req.body;
    //   const { email } = req.body;
      const updateCMS = await postgres.query(
        'UPDATE fragments SET date = $1, movie = $2, short = $3, tv_series = $4, book = $5, play = $6, short_story = $7 WHERE id = $8',
        [date, movie, short, tv_series, book, play, short_story, id]
      );
  
      res.json(updateCMS);
    } catch (err) {
      console.error(err.message);
    }
  });

module.exports = router;