import log4js from 'log4js';
import Account from './account.js';

const logger = log4js.getLogger('bank.js');

export default function Bank() {
    
    this.accounts = {};
    
    // Receives one or more lists of transactions
    // Stores the transactions as a list of accounts with their transactions

    // PSEUDO : ADD pseudo code
    this.loadTransactions = function(...transactionLists) {

        for ( let i = 0; i < transactionLists.length; i++){
            let oneList = transactionLists[i];
            for ( let t = 0; t < oneList.length; t++){
                this.addTransaction(oneList[t]);
            }
        }

        /* alternative implementation
        transactionLists.forEach(transactions => transactions.forEach(transaction =>
            this.addTransaction(transaction)
        ));
        */
    
    }

    // PSEUDO : add pseudocode
    this.getOrCreateAccount = function(owner) {
        return this.accounts[owner] || (this.accounts[owner] = new Account(owner));
    }

    // PSEUDO : add pseudocode
    this.addTransaction = function(transaction) {
        // TODO : debug log adding a transaction
        let fromAccount = this.getOrCreateAccount(transaction.from);
        fromAccount.addOutgoingTransaction(transaction);

        let toAccount = this.getOrCreateAccount(transaction.to);
        toAccount.addIncomingTransaction(transaction);
    }
}
