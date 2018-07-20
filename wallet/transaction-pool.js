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
}

module.exports = TransactionPool;