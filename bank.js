import Account from './account';

export default class Bank {
    constructor() {
        this.accounts = {};
    }

    static fromTransactions(transactions) {
        const bank = new Bank();
        transactions.forEach(transaction => bank.addTransaction(transaction));
        return bank;
    }

    getOrCreateAccount(owner) {
        return this.accounts[owner] || (this.accounts[owner] = new Account(owner));
    }

    addTransaction(transaction) {
        this.getOrCreateAccount(transaction.from).addOutgoingTransaction(transaction);
        this.getOrCreateAccount(transaction.to).addIncomingTransaction(transaction);
    }
}
