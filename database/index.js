const express = require('express');
const db = require('./dbconfig');

const PORT = 3000;
const app = express();

app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM teachers');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}....`);
});

