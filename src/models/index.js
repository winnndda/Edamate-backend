// db.js
const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  // Konfigurasi koneksi ke database
});

mysqlConnection.connect((err) => {
  if (err) {
    console.error('Gagal terhubung ke database:', err);
    return;
  }
  console.log('Terhubung ke database MySQL');
});

module.exports = mysqlConnection;
