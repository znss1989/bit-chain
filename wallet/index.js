const ChainUtil = require('../chain-util');
const {INITIAL_BALANCE} = require('../config');

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex'); // hex string
  }

  display() {
    return `Wallet -
  Public key: ${this.publicKey.toString()}
  Balance: ${this.balance}`
  }

  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }
}

module.exports = Wallet;