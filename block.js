class Block {
  constructor(timeStamp, lastHash, hash, data) {
    this.timeStamp = timeStamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  display() {
    return `Block -
  Timestamp: ${this.timeStamp}
  Last Hash: ${this.lastHash.substring(0, 10)}
  Hash: ${this.hash.substring(0, 10)}
  data: ${this.data}`;
  }

  static genesis() {
    return new this('Genesis time', '---', 'f1r57-h45h', []); // this refers to the class
  }
}

module.exports = Block;