import log4js from 'log4js';
import Account from './account.js';

const logger = log4js.getLogger('bank.js');

export default class Bank {
    constructor() {
        this.accounts = {};
    }

    static fromTransactions(...transactionLists) {
        const bank = new Bank();
        transactionLists.forEach(transactions => transactions.forEach(transaction =>
            bank.addTransaction(transaction)
        ));
        return bank;
    }

    getOrCreateAccount(owner) {
        return this.accounts[owner] || (this.accounts[owner] = new Account(owner));
    }

    addTransaction(transaction) {
        logger.debug('Adding transaction to bank:', transaction);
        this.getOrCreateAccount(transaction.from).addOutgoingTransaction(transaction);
        this.getOrCreateAccount(transaction.to).addIncomingTransaction(transaction);
    }
}
