import log4js from 'log4js';

log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'debug'}
    }
});

import getCSVTransactions from './csvreader.js';
import Bank from './bank.js';
import { getParsedCommand, LIST_ALL, LIST_ACCOUNT, EXIT } from './command.js';

const logger = log4js.getLogger('index.js');

function displayWelcomeMessage() {
    console.log('\nWelcome to SupportBank!');
    console.log('=========================');
}

function processCommand(bank) {
    const command = getParsedCommand();
    logger.info('Processing command:', command);
    if (command.type === EXIT) {
        process.exit(0);
    } else if (command.type === LIST_ALL) {
        listAllAccounts(bank);
    } else if (command.type === LIST_ACCOUNT) {
        listOneAccount(command.account, bank);
    }
}

function listAllAccounts(bank) {
    console.log('\nAll accounts:');
    Object.values(bank.accounts).forEach(account => {
        const balance = account.balance;
        console.log(`  ${account.owner} ${(balance < 0 ? 'owes' : 'is owed')} ${Math.abs(balance).toFixed(2)}`);
    });
}

function listOneAccount(owner, bank) {
    const account = bank.accounts[owner];
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

logger.info('SupportBank starting up');
console.log('\nProcessing transactions...');
const transactions2014 = getCSVTransactions('resources/Transactions2014.csv', 'utf-8');
const transactions2015 = getCSVTransactions('resources/DodgyTransactions2015.csv', 'utf-8');
const bank = Bank.fromTransactions(transactions2014, transactions2015);
displayWelcomeMessage();
while (true) {
    processCommand(bank);
}
