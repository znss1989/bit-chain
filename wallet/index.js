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
    transaction = Transaction.newTransaction(this, recipient, amount);
    transactionPool.transactions.push(transaction);
    return transaction;
  }

  calculateBalance(blockchain) {
    let balance = this.balance;
    let transactions = [];
    blockchain.chain.forEach(block => block.data.forEach(transaction => {
      transactions.push(transaction);
    }));
    const walletInputTransactions = transactions.filter(transaction => {
      return transaction.input.address === this.publicKey;
    });
    let startTime = 0;
    if (walletInputTransactions.length > 0) {
      const recentInputTransaction = walletInputTransactions.reduce((prev, curr) => {
        return prev.input.timestamp > curr.input.timestamp ? prev : curr;
      });
      balance = recentInputTransaction.output.find(output => output.address === this.publicKey).amount;
      startTime = recentInputTransaction.input.timestamp;
    }
    transactions.forEach(transaction => {
      if (transaction.input.timestamp > startTime) {
        transaction.output.find(output => {
          if(output.address === this.publicKey) {
            balance += output.amount;
          }
        });
      }
    });
    return balance;
  }

  static blockchainWallet() {
    const blockchainWallet = new Wallet();
    blockchainWallet.address = 'blockchain-wallet';
    return blockchainWallet;
  }
}

module.exports = Wallet;