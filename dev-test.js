// const Blockchain = require('./blockchain');

// const blockchain = new Blockchain();

// for (let i = 0; i < 10; ++i) {
//   console.log(blockchain.addBlock(`foo ${i}`).display());
// }

// const Wallet = require('./wallet');
// const wallet = new Wallet();
// console.log(wallet.display());



// const Wallet = require('./wallet');
// const Transaction = require('./wallet/transaction');

// let transaction, wallet, recipient, amount;
// wallet = new Wallet();
// amount = 50;
// recipient = "r3c1p13nt";
// console.log(wallet);
// transaction = Transaction.newTransaction(wallet, recipient, amount);
// console.log(transaction);

// const output = transaction.output.find(output => output.address === wallet.publicKey);
// console.log(output);



// const TransactionPool = require('./wallet/transaction-pool');
// const Transaction = require('.//wallet/transaction');
// const Wallet = require('./wallet');

// let transactionPool, transaction, wallet;

// transactionPool = new TransactionPool();
// wallet = new Wallet();
// transaction = Transaction.newTransaction(wallet, 'r4nd-4dr355', 30);
// transactionPool.updateOrAddTransaction(transaction);
// console.log(transaction);
// console.log(transactionPool.transactions);