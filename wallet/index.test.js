const Wallet = require('./index');
const TransactionPool = require('./transaction-pool');
const Blockchain = require('../blockchain');
const {INITIAL_BALANCE} = require('../config');

describe('Wallet', () => {
  let wallet, transactionPool, blockchain;

  beforeEach(() => {
    wallet = new Wallet();
    transactionPool = new TransactionPool();
    blockchain = new Blockchain();
  });

  describe('creating a transaction', () => {
    let transaction, amount, recipient;

    beforeEach(() => {
      amount = 50;
      recipient = 'r4nd0m-4ddr355';
      transaction = wallet.createTransaction(recipient, amount, blockchain, transactionPool);
    });

    describe('doing the same transaction', () => {
      beforeEach(() => {
        wallet.createTransaction(recipient, amount, blockchain, transactionPool);
      });

      it('doubles the `amount` subtracted from wallet balance', () => {
        const senderOutput = transaction.output.find(output => output.address === wallet.publicKey);
        expect(senderOutput.amount).toEqual(wallet.balance - 2 * amount);
      });

      it('clones the same `amount` recipient output', () => {
        const recipientOutputs = transaction.output.filter(output => output.address === recipient);
        expect(recipientOutputs.map(o => o.amount)).toEqual([amount, amount]);
      });
    });
  });

  describe('calculating wallet balance', () => {
    let addBalance, repeatAdd, senderWallet;

    beforeEach(() => {
      senderWallet = new Wallet();
      addBalance = 100;
      repeatAdd = 3;
      for (let i = 0; i < repeatAdd; ++i) {
        senderWallet.createTransaction(wallet.publicKey, addBalance, blockchain, transactionPool);
      }
      blockchain.addBlock(transactionPool.transactions);
    });

    it('calculates the balance for blockchain matching the recipient', () => {
      expect(wallet.calculateBalance(blockchain)).toEqual(INITIAL_BALANCE + addBalance * repeatAdd);
    });

    it('calculates the balance for blockchain matching the sender', () => {
      expect(senderWallet.calculateBalance(blockchain)).toEqual(INITIAL_BALANCE - addBalance * repeatAdd);
    });

    describe('and the recipients conducts a transaction', () => {
      let subtractBlance, recipientBlance;
      
      beforeEach(() => {
        transactionPool.clear();
        subtractBlance = 60;
        recipientBlance = wallet.calculateBalance(blockchain);
        wallet.createTransaction(senderWallet.publicKey, subtractBlance, blockchain, transactionPool);
        blockchain.addBlock(transactionPool.transactions);
      });

      describe('and the sender sends another transaction to the recipient', () => {
        beforeEach(() => {
          transactionPool.clear();
          senderWallet.createTransaction(wallet.publicKey, addBalance, blockchain, transactionPool);
          blockchain.addBlock(transactionPool.transactions);
        });

        it('calculates the recipient balance only using transactions since its most recent one', () => {
          expect(wallet.calculateBalance(blockchain)).toEqual(recipientBlance - subtractBlance + addBalance);
        });
      });
    });
  });
});