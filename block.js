const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(timestamp, lastHash, hash, data) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  display() {
    return `Block -
  Timestamp: ${this.timestamp}
  Last Hash: ${this.lastHash.substring(0, 12)}
  Hash: ${this.hash.substring(0, 12)}
  data: ${this.data}`;
  }

  static genesis() {
    return new Block('Genesis time', '---', 'f1r57-h45h', []);
  }

  static mineBlock(lastBock, data) {
    const timestamp = Date.now();
    const lastHash = lastBock.hash;
    const hash = Block.hash(timestamp, lastHash, data);
    return new Block(timestamp, lastHash, hash, data);
  }

  static hash(timestamp, lastHash, data) {
    return SHA256(`${timestamp}${lastHash}${data}`).toString();
  }
}

module.exports = Block;