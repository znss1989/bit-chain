const {MINE_RATE, DIFFICULTY} = require('../config');
const ChainUtil = require('../chain-util');

class Block {
  constructor(timestamp, lastHash, hash, nonce, data, difficulty) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.nonce = nonce;
    this.data = data;
    this.difficulty = difficulty || DIFFICULTY; // fallback is must
  }

  display() {
    return `Block -
  Timestamp: ${this.timestamp}
  Last Hash: ${this.lastHash.substring(0, 12)}
  Hash: ${this.hash.substring(0, 12)}
  Nonce: ${this.nonce}
  Data: ${this.data}
  Difficulty: ${this.difficulty}`;
  }

  static genesis() {
    return new Block('Genesis time', '---', 'f1r57-h45h', 0, [], DIFFICULTY);
  }

  static mineBlock(lastBlock, data) {
    let timestamp = Date.now();
    const lastHash = lastBlock.hash;
    let nonce = 0;
    let hash = Block.hash(timestamp, lastHash, nonce, data);
    let {difficulty} = lastBlock;
    while (hash.substring(0, difficulty) !== '0'.repeat(difficulty)) {
      ++nonce;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty(lastBlock, timestamp);
      hash = Block.hash(timestamp, lastHash, nonce, data);
    }
    return new Block(timestamp, lastHash, hash, nonce, data, difficulty);
  }

  static hash(timestamp, lastHash, nonce, data) {
    return ChainUtil.hash(`${timestamp}${lastHash}${nonce}${data}`);
  }

  static blockHash(block) {
    const {timestamp, lastHash, nonce, data} = block;
    return Block.hash(timestamp, lastHash, nonce, data);
  }

  static adjustDifficulty(lastBlock, currentTimestamp) {
    let {difficulty, timestamp} = lastBlock;
    difficulty = timestamp + MINE_RATE > currentTimestamp ? difficulty + 1 : difficulty -1;
    return difficulty;
  }
}

module.exports = Block;