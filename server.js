const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const ejs = require('ejs');

// MySQL connection configuration
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root123',
  database: 'crud' 
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Configure middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Route for the home page
app.get('/', (req, res) => {
  const sql = 'SELECT * FROM user';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).send('Error retrieving data');
      return;
    }

    res.render('index', { data: results });
  });
});

// Route for creating a new record
app.post('/data', (req, res) => {
  const { name, email } = req.body;
  console.log('Received form data:', name, email); 
  const sql = 'INSERT INTO user(name, email) VALUES (?, ?)';
  const values = [name, email];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).send('Error creating record');
      return;
    }

    res.redirect('/');
  });
});

// Start the server
const port = 3005;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
