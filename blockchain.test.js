const Block = require('./block');
const Blockchain = require('./blockchain');

describe('Blockchain', () => {
  let blockchain;
  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it('starts with genesis block', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });
  it('adds a new block', () => {
    const data = 'foo';
    blockchain.addBlock(data);
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data);
  });
});