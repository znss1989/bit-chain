const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');
const {INITIAL_BALANCE} = require('../config');

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex'); // hex string
  }

  display() {
    return `Wallet -
  Public key: ${this.publicKey.toString()}
  Balance: ${this.balance}`
  }

  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }

  createTransaction(recipient, amount, transactionPool) {
    if (amount > this.balance) {
      console.log(`Amount: ${amount} exceeds current balance.`);
      return;
    }
    let transaction = transactionPool.existingTransaction(this.publicKey);
    if (transaction) {
      return transaction.update(this, recipient, amount);
    }
    transaction = transaction.newTransaction(this, recipient, amount);
    transactionPool.transactions.push(transaction);
    return transaction;
  }
}

module.exports = Wallet;