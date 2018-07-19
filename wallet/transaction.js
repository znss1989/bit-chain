const ChainUtil = require('../chain-util');

class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.output = [];
  }

  static newTransaction(senderWallet, recepient, amount) {
    const transaction = new Transaction();
    if (amount > senderWallet.balance) {
      console.log(`Amount: ${amount} exceeds balance.`);
      return;
    }
    transaction.output.push(...[
      {
        amount: senderWallet.balance - amount,
        address: senderWallet.publicKey
      },
      {
        amount,
        address: recepient
      }
    ]);
    return transaction;
  }
}

module.exports = Transaction;