import log4js from 'log4js';
import Bank from './bank/bank';
import { getParsedCommand, LIST_ALL, LIST_ACCOUNT, IMPORT_FILE, EXIT } from './command';
import getTransactions from './parsing/transactionReader';

const logger = log4js.getLogger('consoleRunner.js');

export default class ConsoleRunner {
    constructor() {
        this.bank = new Bank();
    }

    displayWelcomeMessage() {
        console.log('\nWelcome to SupportBank!');
        console.log('=========================');
    }
    
    processCommand() {
        const command = getParsedCommand();
        logger.info('Processing command:', command);
        if (command.type === EXIT) {
            process.exit(0);
        } else if (command.type === LIST_ALL) {
            this.listAllAccounts();
        } else if (command.type === LIST_ACCOUNT) {
            this.listOneAccount(command.data.account);
        } else if (command.type === IMPORT_FILE) {
            this.importTransactions(command.data.filePath);
        }
    }
    
    listAllAccounts() {
        console.log('\nAll accounts:');
        Object.values(this.bank.accounts).forEach(account => {
            const balance = account.balance;
            console.log(`  ${account.owner} ${(balance < 0 ? 'owes' : 'is owed')} ${Math.abs(balance).toFixed(2)}`);
        });
    }
    
    listOneAccount(owner) {
        const account = this.bank.accounts[owner];
        if (account !== undefined) {
            // Get the transactions sorted in date order
            console.log(`\nAccount ${owner}:`);
            const transactions = account.incomingTransactions.concat(account.outgoingTransactions);
            transactions.sort((a, b) => a.date.isBefore(b.date) ? -1 : (a.date.isSame(b.date) ? 0 : 1));
    
            // Display each transaction
            transactions.forEach(transaction => {
                const formattedDate = transaction.date.format('DD/MM/YYYY');
                const formattedAmount = transaction.amount.toFixed(2);
                console.log(`  ${formattedDate} - ${transaction.from} paid ${transaction.to} ${formattedAmount} for ${transaction.narrative}`)
            });
        } else {
            console.log(`\nThere is no account known in the name of ${owner}`);
        }
    }

    importTransactions(filePath) {
        try {
            const transactions = getTransactions(filePath, 'utf-8');
            this.bank.addTransactions(transactions.validTransactions);
            transactions.invalidTransactions.forEach(transaction => {
                console.error(`\nWARNING! Skipping invalid transaction number ${transaction.index} of ${transaction.filePath}: ${JSON.stringify(transaction.transaction)}`);
            });
            console.log(`\nFinished importing transactions from ${filePath}`);
        } catch (e) {
            logger.error(e);
            console.error('\n' + e.message);
        }
    }
    
    run() {
        this.displayWelcomeMessage();
        while (true) {
            this.processCommand();
        }
    }
}