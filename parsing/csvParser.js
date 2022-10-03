import {parse as csvParseSync} from 'csv-parse/sync';
import log4js from 'log4js';
import moment from 'moment';
import Transaction from '../bank/transaction.js';

const logger = log4js.getLogger('csvParser.js');

export default class CSVParser {

    parseSingleTransaction(rawTransaction) {
        logger.debug('Parsing single CSV transaction:', rawTransaction);
        return new Transaction(
            moment(rawTransaction.Date, 'DD/MM/YYYY'),
            rawTransaction.From,
            rawTransaction.To,
            rawTransaction.Narrative,
            +rawTransaction.Amount
        );
    }

    getTransactions(data) {
        logger.info('Parsing CSV transactions');
        return csvParseSync(data, {columns: true}).map(this.parseSingleTransaction);
    }
}
