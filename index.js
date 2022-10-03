import log4js from 'log4js';

log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'debug'}
    }
});


import Bank from './bank/bank.js';

import ConsoleRunner from './consoleRunner.js';


const logger = log4js.getLogger('index.js');

function displayWelcomeMessage() {
    console.log('\nWelcome to SupportBank!');
    console.log('=========================');
}

function processCommand(bank) {
    const command = getParsedCommand();
    logger.into(command);
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
    let accountArray = Object.values(bank.accounts);

    for ( let i = 0; i < accountArray.length; i++){
        let account = accountArray[i];
        const balance = account.balance();

        let label;
        if (balance < 0){
            label = 'owes';
        } else {
            label = 'is owed'
        }

        // get the number to two decimal places ignoring the sign
        let absoluteBalanceToTwoDecimalPlaces = Math.abs(balance).toFixed(2);
        console.log(`  ${account.owner} ${label} ${absoluteBalanceToTwoDecimalPlaces}`);
    }

    /* 
    // alternative way of looping through accounts 
    function displayOneAccount(account) {
        const balance = account.balance;
        console.log(`  ${account.owner} ${(balance < 0 ? 'owes' : 'is owed')} ${Math.abs(balance).toFixed(2)}`);
    }
    // for each will call displayOneAccount with each account in turn
    accountArray.forEach( displayOneAccount );
    */
}

function listOneAccount(owner, bank) {
    const account = bank.accounts[owner];
    if (account !== undefined) {
        // Get the transactions sorted in date order
        console.log(`\nAccount ${owner}:`);
        const transactions = account.incomingTransactions.concat(account.outgoingTransactions);
        
        // all sort functions must return -1, 0 or 1
        // for less, equal and greater respectively
        const sortByDate = function(a, b){
            if ( a.date.isBefore(b.date) ) {
                return -1;
            } else if ( a.date.isSame(b.date) ) {
                return 0;
            } else {
                return 1;
            }
        }

        // array sort works directly on the array
        transactions.sort(sortByDate);

        /* Alternative, one-line implementation of sort
        transactions.sort((a, b) => a.date.isBefore(b.date) ? -1 : (a.date.isSame(b.date) ? 0 : 1));
        */

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
new ConsoleRunner().run();

