import Account from './account.js';

export default class Bank {
    constructor() {
        this.accounts = {};
    }


    getOrCreateAccount(owner) {
        return this.accounts[owner] || (this.accounts[owner] = new Account(owner));
    }

    addTransaction(transaction) {
        this.getOrCreateAccount(transaction.from).addOutgoingTransaction(transaction);
        this.getOrCreateAccount(transaction.to).addIncomingTransaction(transaction);
    }
}
