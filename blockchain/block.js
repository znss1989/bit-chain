const SHA256 = require('crypto-js/sha256');

const {DIFFICULTY} = require('../config');

class Block {
  constructor(timestamp, lastHash, hash, nonce, data) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.nonce = nonce;
    this.data = data;
  }

  display() {
    return `Block -
  Timestamp: ${this.timestamp}
  Last Hash: ${this.lastHash.substring(0, 12)}
  Hash: ${this.hash.substring(0, 12)}
  Nonce: ${this.nonce}
  data: ${this.data}`;
  }

  static genesis() {
    return new Block('Genesis time', '---', 'f1r57-h45h', 0, []);
  }

  static mineBlock(lastBock, data) {
    let timestamp = Date.now();
    const lastHash = lastBock.hash;
    let nonce = 0;
    let hash = Block.hash(timestamp, lastHash, nonce, data);
    while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY)) {
      ++nonce;
      timestamp = Date.now();
      hash = Block.hash(timestamp, lastHash, nonce, data);
    }
    return new Block(timestamp, lastHash, hash, nonce, data);
  }

  static hash(timestamp, lastHash, nonce, data) {
    return SHA256(`${timestamp}${lastHash}${nonce}${data}`).toString();
  }

  static blockHash(block) {
    const {timestamp, lastHash, nonce, data} = block;
    return Block.hash(timestamp, lastHash, nonce, data);
  }
}

module.exports = Block;