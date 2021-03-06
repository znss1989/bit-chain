const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');
const Blockchain = require('../blockchain');

describe('Transaction pool', () => {
  let transactionPool, transaction, wallet, blockchain;

  beforeEach(() => {
    transactionPool = new TransactionPool();
    wallet = new Wallet();
    blockchain = new Blockchain();
    transaction = wallet.createTransaction('r4nd-4dr355', 30, blockchain, transactionPool);
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

  it('clears transactions', () => {
    transactionPool.clear();
    expect(transactionPool.transactions).toEqual([]);
  });

  describe('mixing valid and corrupt transactions', () => {
    let validTransactions;

    beforeEach(() => {
      validTransactions = [...transactionPool.transactions];
      for (let i = 0; i < 5; ++i) {
        wallet = new Wallet();
        transaction = wallet.createTransaction('r4nd-4dr355', 30, blockchain, transactionPool);
        if (i % 2 === 0) {
          transaction.input.amount = 999999;
        } else {
          validTransactions.push(transaction);
        }
      }
    });

    it('shows difference between valid and corrupt transactions', () => {
      expect(JSON.stringify(transactionPool.transactions)).not.toEqual(JSON.stringify(validTransactions));
    });

    it('wraps the valid transactions', () => {
      expect(transactionPool.validTransactions()).toEqual(validTransactions);
    });
  });
});