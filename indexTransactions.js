import getCSVTransactions from './csvreader.js';
import Bank from './bank.js';
import { getParsedCommand, LIST_ALL, LIST_ACCOUNT } from './command.js';

function displayWelcomeMessage() {
    console.log('\nWelcome to SupportBank!');
    console.log('=========================');
}

function processCommand(bank) {
    const command = getParsedCommand();
    if (command.type === LIST_ALL) {
        listAllAccounts(bank);
    } else if (command.type === LIST_ACCOUNT) {
        listOneAccount(command.account, bank);
    }
}

function listAllAccounts(transactions) {
    console.log('\nAll accounts:');
    // *** how do we get a list of the accounts
}

function listOneAccount(owner, transactions) {
    console.log(`\ntransactions for : ${owner}`);
    // *** how ???
}

const transactions = getCSVTransactions('resources/Transactions2014.csv', 'utf-8');

displayWelcomeMessage();
while (true) {
    processCommand(bank);
}