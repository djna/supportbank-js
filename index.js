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

function listAllAccounts(bank) {
    console.log('\nAll accounts:');
    Object.values(bank.accounts).forEach( function(oneAccount){
        console.log(`account ${oneAccount.owner}`);
        // *** amend the output above to include the account balance
    });
}

function listOneAccount(owner, bank) {
    const account = bank.accounts[owner];
    if (account !== undefined) {
        // Get the transactions sorted in date order
        console.log(`\nAccount ${owner}: *** NOT IMPLEMENTED ***`);
        // *** add code here to get transactions for account
    } else {
        console.log(`\nThere is no account known in the name of ${owner}`);
    }
}

const bank = new Bank();

const transactions = getCSVTransactions('resources/Transactions2014.csv', 'utf-8');
transactions.forEach(
    function(transaction){
        bank.addTransaction(transaction);
    }
);

displayWelcomeMessage();
while (true) {
    processCommand(bank);
}