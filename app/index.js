const express = require('express');
const bodyParser = require('body-parser');

const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');

const HTTP_PORT = process.env.HTTP_PORT || 3001; // set with command like: PORT=3002 npm run dev
const blockchain = new Blockchain();
const p2pserver = new P2pServer(blockchain);

const app = express();
app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
  res.json(blockchain.chain);
});

app.post('/mine', (req, res) => {
  const block = blockchain.addBlock(req.body.data); // validation TBD...
  console.log(`New block added: ${block.toString()}`);
  res.redirect('/blocks');
});

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port: ${HTTP_PORT}...`);
});
p2pserver.listen();