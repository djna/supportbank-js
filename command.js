import { prompt } from 'readline-sync';

export const LIST_ALL = 1;
export const LIST_ACCOUNT = 2;

class Command {
    constructor(type, account) {
        this.type = type;
        this.account = account;
    }
}

function promptForCommand() {
    console.log('\nAvailable commands:');
    console.log(' - List All');
    console.log(' - List <Account>');
    console.log('Please enter your command:');
    return prompt();
}

function parseCommand(command) {
    if (command.toLowerCase() === 'list all') {
        return new Command(LIST_ALL);
    } else if (command.toLowerCase().startsWith('list ')) {
        const account = command.slice(5);
        return new Command(LIST_ACCOUNT, account);
    } else {
        return undefined;
    }
}

export function getParsedCommand() {
    let command;
    do {
        command = parseCommand(promptForCommand());
    } while (command === undefined && (console.log('Please enter a valid command') || true));
    return command;
}
