const Block = require('./block');

const genesisBlock = Block.genesis();
const fooBlock = Block.mineBlock(Block.genesis(), 'foo');
console.log(genesisBlock.display());
console.log(fooBlock.display());