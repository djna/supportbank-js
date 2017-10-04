import { readFileSync } from 'fs';
import csvParseSync from 'csv-parse/lib/sync';
import log4js from 'log4js';
import moment from 'moment';
import Transaction from './transaction';

const logger = log4js.getLogger('csvreader.js');

function parseRecordToTransaction(record) {
    logger.debug('Record:', record);

    const date = moment(record.Date, 'DD/MM/YYYY');
    const amount = +record.Amount;

    if (!date.isValid()) {
        throw new Error(`Record contains an invalid date: ${JSON.stringify(record)}`);
    } 
    
    if (isNaN(amount)) {
        throw new Error(`Record contains an invalid amount: ${JSON.stringify(record)}`);
    }
    
    return new Transaction(
        date,
        record.From,
        record.To,
        record.Narrative,
        amount
    );
}

export default function getTransactions(filePath, encoding) {
    logger.info(`Loading CSV transactions from ${filePath}`);
    const data = readFileSync(filePath, {encoding});
    return csvParseSync(data, {columns: true}).reduce((validTransactions, record, idx) => {
        logger.debug(`Parsing transaction number ${idx} from ${filePath}`);
        try {
            validTransactions.push(parseRecordToTransaction(record));
        } catch (e) {
            logger.error('Skipping transaction due to the following error: ', e);
            console.error(`\nWARNING! Skipping invalid CSV transaction: ${JSON.stringify(record)}`);
        }
        return validTransactions;
    }, []);
}
