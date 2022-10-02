export default function Account(owner) {
    
    this.owner = owner;
    this.incomingTransactions = [];
    this.outgoingTransactions = [];
    // design decision: don't keep balance, compute it when needed
    

    this.addIncomingTransaction = function (transaction) {
        this.incomingTransactions.push(transaction);
    }

    this.addOutgoingTransaction = function (transaction) {
        this.outgoingTransactions.push(transaction);
    }

    // returns the account balance
    // positive if we are owed money, negative if we owe the bank money
    // PSEUDO: add pseudo code
    this.balance = function() {
        this.incomingTransactions
        let credits = 0;

        for ( let cindex = 0; cindex < this.incomingTransactions.length; cindex++) {
              credits += this.incomingTransactions[cindex].amount;
        }

        let debits = 0;
        for ( let dindex = 0; dindex < this.outgoingTransactions.length; dindex++) {
            debits += this.outgoingTransactions[dindex].amount;
        }

        return credits - debits;
        
        /* alternative implementation
        const credits = this.incomingTransactions.reduce((acc, curr) => acc + curr.amount, 0);
        const debits = this.outgoingTransactions.reduce((acc, curr) => acc + curr.amount, 0);
        return credits - debits;
        */
    }
}
