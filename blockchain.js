const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const lastBlock = this.chain[this.chain.length - 1];
    const block = Block.mineBlock(lastBlock, data);
    this.chain.push(block);
    return block;
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) {
      console.log("Chain length is shorter than current.");
      return;
    }
    if (!Blockchain.isValidChain(newChain)) {
      console.log("Received chain is not valid.");
      return;
    }
    this.chain = newChain;
    console.log("Blockchain updated with new chain.");
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
    for (let i = 1; i < chain.length; ++i) {
      const block = chain[i];
      const lastBlock = chain[i - 1];
      if (block.lastHash !== lastBlock.hash) return false;
      if (block.hash !== Block.blockHash(block)) return false;
    }
    return true;
  }
}

module.exports = Blockchain;