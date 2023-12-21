const express = require('express');
const edamameRoutes = require('./src/router/index');

const app = express();
app.use(express.json());

app.use('/edamame', edamameRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
