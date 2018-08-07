const express = require('express');
const bodyParser = require('body-parser');

const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');
const Miner = require('./miner');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');

const HTTP_PORT = process.env.HTTP_PORT || 3001; // set with command like: PORT=3002 npm run dev
const blockchain = new Blockchain();
const wallet = new Wallet();
const transactionPool = new TransactionPool();
const p2pServer = new P2pServer(blockchain, transactionPool);
const miner = new Miner(blockchain, transactionPool, wallet, p2pServer);

const app = express();
app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
  res.json(blockchain.chain);
});

app.post('/mine', (req, res) => {
  const block = blockchain.addBlock(req.body.data); // validation TBD...
  console.log(`New block added: ${block.display()}`);
  p2pServer.syncChains();
  res.redirect('/blocks');
});

app.get('/transactions', (req, res) => {
  res.json(transactionPool.transactions);
});

app.post('/transact', (req, res) => {
  const {recipient, amount} = req.body; // validation TBD...
  const transaction = wallet.createTransaction(recipient, amount, blockchain, transactionPool);
  p2pServer.broadcastTransaction(transaction);
  res.redirect('/transactions');
});

app.get('/mine-transactions', (req, res) => {
  const block = miner.mine();
  console.log(`New block added: ${block.display()}`);
  res.redirect('/blocks');
});

app.get('/public-key', (req, res) => {
  res.json({
    publicKey: wallet.publicKey
  });
});

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port: ${HTTP_PORT}...`);
});
p2pServer.listen();