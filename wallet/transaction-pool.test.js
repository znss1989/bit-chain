const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction pool', () => {
  let transactionPool, transaction, wallet;

  beforeEach(() => {
    transactionPool = new TransactionPool();
    wallet = new Wallet();
    transaction = Transaction.newTransaction(wallet, 'r4nd-4dr355', 30);
    transactionPool.updateOrAddTransaction(transaction);
  });

  it('adds a transaction to the pool', () => {
    const transactionMatched = transactionPool.transactions.find(t => t.id === transaction.id);
    expect(transactionMatched).toEqual(transaction);
  });

  it('updates a transaction to the pool', () => {
    const oldTransactionStr = JSON.stringify(transaction);
    const newTransaction = transaction.update(wallet, 'foo-4ddr355', 40);
    transactionPool.updateOrAddTransaction(newTransaction);
    const transactionMatched = transactionPool.transactions.find(t => t.id == newTransaction.id);
    expect(JSON.stringify(transactionMatched)).not.toEqual(oldTransactionStr);
  });
});