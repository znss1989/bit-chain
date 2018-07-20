// const Transaction = require('./transaction');
const Wallet = require('./index');
const Transaction = require('./transaction');

describe('Transaction', () => {
  let transaction, wallet, recipient, amount;

  beforeEach(() => {
    wallet = new Wallet();
    amount = 50;
    recipient = "r3c1p13nt";
    transaction = Transaction.newTransaction(wallet, recipient, amount);
  });

  it('outputs the `amount` after subtracted from the wallet balance', () => {
    const output = transaction.output.find(output => output.address === wallet.publicKey);
    expect(output.amount).toEqual(wallet.balance - amount);
  });

  it('outputs the `amount` sent to the recipient', () => {
    const output = transaction.output.find(output => output.address == recipient);
    expect(output.amount).toEqual(amount);
  });

  describe('transacting with amount that exceeds balance', () => {
    beforeEach(() => {
      amount = 1000;
      transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('does not create the transaction', () => {
      expect(transaction).toEqual(undefined);
    });
  });
});