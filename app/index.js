const express = require('express');

const Blockchain = require('../blockchain');

const PORT = process.env.PORT || 3001; // set with command like: PORT=3002 npm run dev
const app = express();
const blockchain = new Blockchain();

app.get('/blocks', (req, res) => {
  res.json(blockchain.chain);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}...`);
});