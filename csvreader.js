import { readFileSync } from 'fs';
import {parse as csvParseSync} from 'csv-parse/sync';
import log4js from 'log4js';
import moment from 'moment';
import Transaction from './transaction.js';

const logger = log4js.getLogger('csvreader.js');

// PSEUDO : add pseudo code
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

// PSEUDO: add pseudo code
export default function getTransactions(filePath, encoding) {
    logger.info(`Loading CSV transactions from ${filePath}`);

    let data;
    try {
        data = readFileSync(filePath, {encoding});
    } catch (e) {
        logger.error(`Failed to read : ${filePath}, reason: ${e}`);
        console.error(`\ERROR! failed to read ${filePath}: ${e}`);
        return [];
    }

    const parsedData = csvParseSync(data, {columns: true});
    let validTransactions = [];

    for ( let i = 0 ; i < parsedData.length; i++){
        logger.debug(`Parsing transaction number ${i} from ${filePath}`);
        let record = parsedData[i];
        try {
            let transaction = parseRecordToTransaction(record);
            validTransactions.push( transaction );
        } catch (e) {
            logger.error('Skipping transaction due to the following error: ', e);
            console.error(`\nWARNING! Skipping invalid CSV transaction: ${JSON.stringify(record)}`);
        } 
    }
    return validTransactions;
    /* alternative implementation
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
    */
}
