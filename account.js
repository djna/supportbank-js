export default function Account(owner) {
    
    this.owner = owner;
    this.incomingTransactions = [];
    this.outgoingTransactions = [];
    

    this.addIncomingTransaction = function (transaction) {
        this.incomingTransactions.push(transaction);
    }

    this.addOutgoingTransaction = function (transaction) {
        this.outgoingTransactions.push(transaction);
    }

    this.balance = function() {
        const credits = this.incomingTransactions.reduce((acc, curr) => acc + curr.amount, 0);
        const debits = this.outgoingTransactions.reduce((acc, curr) => acc + curr.amount, 0);
        return credits - debits;
    }
}
