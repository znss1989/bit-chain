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
  Last Hash: ${this.lastHash.substring(0, 10)}
  Hash: ${this.hash.substring(0, 10)}
  data: ${this.data}`;
  }

  static genesis() {
    return new this('Genesis time', '---', 'f1r57-h45h', []); // this refers to the class
  }

  static mineBlock(lastBock, data) {
    const timestamp = Date.now();
    const lastHash = lastBock.hash;
    const hash = 'TBD'; // to be implemented
    return new this(timestamp, lastHash, hash, data);
  }
}

module.exports = Block;