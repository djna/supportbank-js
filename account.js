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
      // *** add code here to obtain balance
    }
}
