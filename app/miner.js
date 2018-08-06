class Miner {
  constructor(blockchain, transactionPool, wallet, p2pServer) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
  }

  mine() {
    const validTransactions = this.transactionPool.validTransactions(); // TBD
    // include a reward for the miner
    // create a block consisting the valide transactions
    // sync the chains in the p2p server
    // clear the local transaction pool and broadcast every other
  }
}

module.exports = Miner;