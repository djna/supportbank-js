import log4js from 'log4js';
import { readFileSync } from 'fs';
import CSVParser from './csvParser';
import JSONParser from './jsonParser';
import XMLParser from './xmlParser';

const logger = log4js.getLogger('transactionReader.js');

function getParser(filePath) {
    if (filePath.endsWith('.csv')) {
        return new CSVParser();
    } else if (filePath.endsWith('.json')) {
        return new JSONParser();
    } else if (filePath.endsWith('.xml')) {
        return new XMLParser();
    } else {
        throw new Error('Unrecognized file type');
    }
}

function getValidationErrors(transaction) {
    let errors = [];

    if (!transaction.date || !transaction.date.isValid || !transaction.date.isValid()) {
        errors.push('Invalid date');
    }
    if (!transaction.from) {
        errors.push('No \'from\' account');
    }
    if (!transaction.to) {
        errors.push('No \'from\' account');
    }
    if (isNaN(transaction.amount)) {
        errors.push('Invalid amount');
    }

    return errors;
}

export default function getTransactions(filePath, encoding) {
    logger.info(`Reading transactions from ${filePath}`);
    const parser = getParser(filePath);
    const data = readFileSync(filePath, {encoding});
    const transactions = parser.getTransactions(data);

    let invalidTransactions = [];
    return {
        validTransactions: transactions.filter((transaction, index) => {
            const errors = getValidationErrors(transaction);
            if (errors.length === 0) {
                return true;
            } else {
                logger.error(`Errors in transaction number ${index} of ${filePath}:`, errors);
                invalidTransactions.push({transaction, index, filePath});
                return false;
            }
        }),
        invalidTransactions
    };
}
