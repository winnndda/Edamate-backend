const mysqlConnection = require('../db');

const addEdamame = (req, res) => {
  const { quantity } = req.body;
  const biji = req.params.biji;

  let id_edamame;
  if (biji === 'biji2') {
    id_edamame = 1;
  } else if (biji === 'biji3') {
    id_edamame = 2;
  } else {
    return res.status(400).json({ error: 'Jenis biji tidak valid' });
  }

  const query = 'INSERT INTO edamame (id_edamame, quantity) VALUES (?, ?)';
  mysqlConnection.query(query, [id_edamame, quantity], (err, results) => {
    if (err) {
      console.error('Gagal Menambahkan:', err);
      return res.status(500).json({ error: `Gagal menambahkan edamame dengan biji ${biji3}` });
    }
    return res.json({ message: `Berhasil menambahkan edamame dengan biji ${biji3}` });
  });
};

module.exports = { addEdamame };
