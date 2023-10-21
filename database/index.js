const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'postgres'
});

const PORT = 3000;

const app = express();
app.use(cors());

client.connect(err => {
  if(err) throw err
  console.log('database conected ...') 
});

app.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM teachers');
    console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}....`);
});

