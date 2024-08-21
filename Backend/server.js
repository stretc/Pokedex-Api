const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/pokedex', (req, res) => {
  const filePath = path.join(__dirname, 'pokedex.json');
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});