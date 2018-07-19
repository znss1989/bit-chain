const {INITIAL_BALANCE} = require('../config');

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = null;
    this.publicKey = null;
  }

  display() {
    return `Wallet -
  Public key: ${this.publicKey.toString()}
  Balance: ${this.balance}`
  }
}

module.exports = Wallet;