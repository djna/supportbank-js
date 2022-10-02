import log4js from 'log4js';
import Account from './account.js';

const logger = log4js.getLogger('bank.js');

export default class Bank {
    constructor() {
        this.accounts = {};
    }

    
    // Receives one or more lists of transactions
    // returns a new Bank holding all of the accounts in those transactions

    // PSEUDO : ADD pseudo code
    static fromTransactions(...transactionLists) {
        const bank = new Bank();

        for ( let i = 0; i < transactionLists.length; i++){
            let oneList = transactionLists[i];
            for ( let t = 0; t < oneList.length; t++){
                bank.addTransaction(oneList[t]);
            }
        }

        /* alternative implementation
        transactionLists.forEach(transactions => transactions.forEach(transaction =>
            bank.addTransaction(transaction)
        ));
        */
        return bank;
    }

    // PSEUDO : add pseudocode
    getOrCreateAccount(owner) {
        return this.accounts[owner] || (this.accounts[owner] = new Account(owner));
    }

    // PSEUDO : add pseudocode
    addTransaction(transaction) {
        // TODO : debug log adding a transaction
        let fromAccount = this.getOrCreateAccount(transaction.from);
        fromAccount.addOutgoingTransaction(transaction);

        let toAccount = this.getOrCreateAccount(transaction.to);
        toAccount.addIncomingTransaction(transaction);
    }
}
