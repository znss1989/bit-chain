const Transaction = require('./transaction');

class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  updateOrAddTransaction(transaction) {
    let transactionMatched = this.transactions.find(t => t.id === transaction.id);
    if (!transactionMatched) {
      this.transactions.push(transaction);
      return;
    }
    this.transactions[this.transactions.indexOf(transactionMatched)] = transaction; // replace rather than change
  }

  existingTransaction(address) {
    return this.transactions.find(t => t.input.address === address);
  }

  validTransactions() {
    return this.transactions.filter(transaction => {
      const outputTotal = transaction.output.reduce((total, output) => {
        return total + output.amount;
      }, 0);
      if (transaction.input.amount !== outputTotal) {
        console.log(`Invalid transaction from ${transaction.input.address}`);
        return false;
      }
      if (!Transaction.verifyTransaction(transaction)) {
        console.log(`Invalid signature from ${transaction.input.address}`);
        return false;
      }
      return true;
    });
  }
}

module.exports = TransactionPool;