// const Blockchain = require('./blockchain');

// const blockchain = new Blockchain();

// for (let i = 0; i < 10; ++i) {
//   console.log(blockchain.addBlock(`foo ${i}`).display());
// }

const Wallet = require('./wallet');
const wallet = new Wallet();
console.log(wallet.display());