const express = require('express');
const router = express.Router();
const postgres = require('../postgres.js');

router.get('/', (req, res) => {
    postgres.query('SELECT * FROM test ORDER BY test_id ASC;', (err, results) => {
        res.send(results.rows)
    });
});

router.post("/", async (req, res) => {
    try {
      const { name } = req.body;
      const { email } = req.body;
      const newTest = await postgres.query(
        "INSERT INTO test (name, email) VALUES($1, $2) RETURNING *",
        [name, email]
      );
  
      res.json(newTest.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

router.delete('/:id', (req, res) => {
    postgres.query(`DELETE FROM test WHERE test_id = ${req.params.id};`, (err, results) => {
        postgres.query('SELECT * FROM test ORDER BY test_id ASC;', (err, results) => {
            res.json(results.rows)
        });
    });
});

router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
    //   const { email } = req.body;
      const updateTest = await postgres.query(
        'UPDATE test SET name = $1 WHERE test_id = $2',
        [name, id]
      );
  
      res.json(updateTest);
    } catch (err) {
      console.error(err.message);
    }
  });

module.exports = router;

/////////////////////////////////////////////////////////////////////////
// code graveyard TEST
/////////////////////////////////////////////////////////////////////////

// router.post('/', (req, res) => {
//     postgres.query(`INSERT INTO test (name, email) VALUES ('${req.body.name}', '${req.body.email}'`,
//     (err, results) => {
//         postgres.query('SELECT * FROM test ORDER BY test_id ASC;', (err, results) => {
//             res.json(results.rows)
//         });
//     })
// });

// router.put('/:id', (req, res) => {
//     postgres.query(`UPDATE test SET name = '${req.body.name}', email = ${req.body.email} WHERE test_id = ${req.params.id}`, (err, results) => {
//         postgres.query('SELECT * FROM test ORDER BY test_id ASC;', (err, results) => {
//             res.json(results.rows)
//         });
//     })
// });