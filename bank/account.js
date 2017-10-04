export default class Account {
    constructor(owner) {
        this.owner = owner;
        this.incomingTransactions = [];
        this.outgoingTransactions = [];
    }

    addIncomingTransaction(transaction) {
        this.incomingTransactions.push(transaction);
    }

    addOutgoingTransaction(transaction) {
        this.outgoingTransactions.push(transaction);
    }

    get balance() {
        const credits = this.incomingTransactions.reduce((acc, curr) => acc + curr.amount, 0);
        const debits = this.outgoingTransactions.reduce((acc, curr) => acc + curr.amount, 0);
        return credits - debits;
    }
}
