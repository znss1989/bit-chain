const Block = require('./block');

console.log(Block.genesis().display());

const block = new Block('foo', 'bar', 'zoo', 'baz');
console.log(block.display());