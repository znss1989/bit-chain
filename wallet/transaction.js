const ChainUtil = require('../chain-util');

class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.output = [];
  }

  update(senderWallet, recepient, amount) {
    const senderOutput = this.output.find(output => output.address === senderWallet.publicKey);
    if (amount > senderOutput.amount) {
      console.log(`Amount: ${amount} exceeds balance`);
      return;
    }
    senderOutput.amount -= amount;
    this.output.push({
      amount,
      address: recepient
    });
    Transaction.signTransaction(this, senderWallet);
    return this;
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
    Transaction.signTransaction(transaction, senderWallet);
    return transaction;
  }

  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtil.hash(transaction.output))
    };
  }

  static verifyTransaction(transaction) {
    return ChainUtil.verifySignature(transaction.input.address, 
      transaction.input.signature, 
      ChainUtil.hash(transaction.output)
    );
  }
}

module.exports = Transaction;