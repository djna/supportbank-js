import Account from './account.js';

export default class Bank {
    constructor() {
        this.accounts = {};
    }


    getOrCreateAccount(owner) {
        return this.accounts[owner] || (this.accounts[owner] = new Account(owner));
    }

    addTransaction(transaction) {
        let fromAccount = this.getOrCreateAccount(transaction.from);
        // *** add code here to add transaction  to account
        
        // *** add code here to do the same for to transaction.to
    }
}
