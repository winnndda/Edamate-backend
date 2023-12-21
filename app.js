const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Konfigurasi koneksi ke database
const connection = mysql.createConnection({
  host: 'localhost', // sesuaikan dengan host Anda
  user: 'root', // sesuaikan dengan username MySQL Anda
  password: '', // sesuaikan dengan password MySQL Anda
  database: 'db_edamate', // sesuaikan dengan nama database yang telah dibuat
});

// Lakukan koneksi ke database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Registrasi pengguna baru
app.post('/register', async (req, res) => {
  try {
    const { user_name, user_password } = req.body;

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(user_password, 10);

    // Simpan pengguna ke database
    const insertUserQuery = 'INSERT INTO user (user_email, user_password) VALUES (?, ?)';
    connection.query(insertUserQuery, [user_name, hashedPassword], (error, results) => {
      if (error) {
        return res.status(400).json({ message: 'Gagal melakukan registrasi' });
      }
      res.status(201).json({ message: 'Registrasi berhasil' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat registrasi' });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    console.log(user_email, user_password)
    // Dapatkan pengguna berdasarkan username
    const getUserQuery = 'SELECT * FROM user WHERE user_email = ?';
    console.log(getUserQuery)
    connection.query(getUserQuery, [user_email], async (error, results) => {
      if (error) {
        return res.status(500).json(error.message);
      }
      

      if (results.length === 0) {
        return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
      }

      const user = results[0];

      // Bandingkan password yang dimasukkan dengan password di database
      console.log(user)
      const passwordMatch = await bcrypt.compare(user_password, user.user_password); // Menggunakan user.user_password dari hasil query

      res.status(200).json({ message: 'Login berhasil' });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});
  

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
