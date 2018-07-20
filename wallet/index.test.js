const Wallet = require('./index');
const TransactionPool = require('./transaction-pool');

describe('Wallet', () => {
  let wallet, transactionPool;

  beforeEach(() => {
    wallet = new Wallet();
    transactionPool = new TransactionPool();
  });

  describe('creating a transaction', () => {
    let transaction, amount, recipient;

    beforeEach(() => {
      amount = 50;
      recipient = 'r4nd0m-4ddr355';
      transaction = wallet.createTransaction(recipient, amount, transactionPool);
    });

    describe('doing the same transaction', () => {
      beforeEach(() => {
        wallet.createTransaction(recipient, amount, transactionPool);
      });

      it('doubles the `amount` subtracted from wallet balance', () => {
        const senderOutput = transaction.output.find(output => output.address === wallet.publicKey);
        expect(senderOutput.amount).toEqual(wallet.balance - 2 * amount);
      });

      it('clones the same `amount` recipient output', () => {
        const recipientOutputs = transaction.output.filter(output => output.address === recipient);
        expect(recipientOutputs.map(o => o.amount)).toEqual([amount, amount]);
      });
    });
  });
});