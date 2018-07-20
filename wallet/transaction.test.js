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

  it('inputs the `balance` of the wallet', () => {
    expect(transaction.input.amount).toEqual(wallet.balance);
  });

  it('validates a valid transaction', () => {
    expect(Transaction.verifyTransaction(transaction)).toBe(true);
  });

  it('invalidates an invalid transaction', () => {
    transaction.output[1].amount = 888; // corrupt transaction
    expect(Transaction.verifyTransaction(transaction)).toBe(false);
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

  describe('updating a transaction', () => {
    let nextAmount, nextRecipient;

    beforeEach(() => {
      nextAmount = 20;
      nextRecipient = 'n3xt-4ddr355';
      transaction = transaction.update(wallet, nextRecipient, nextAmount);
    });

    it('subtracts the `nextAmount` from the sender', () => {
      const senderOutput = transaction.output.find(output => output.address === wallet.publicKey);
      expect(senderOutput.amount).toEqual(wallet.balance - amount - nextAmount);
    });

    it('outputs an amount to the next recipient', () => {
      const nextOutput = transaction.output.find(output => output.address === nextRecipient);
      expect(nextOutput.amount).toEqual(nextAmount);
    });
  });
});