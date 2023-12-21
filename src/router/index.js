const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10, // Sesuaikan sesuai kebutuhan
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_edamate'
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
  connection.release();
});

module.exports = pool;
