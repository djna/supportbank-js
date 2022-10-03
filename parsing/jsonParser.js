import log4js from 'log4js';
import moment from 'moment';
import Transaction from '../bank/transaction.js';

const logger = log4js.getLogger('jsonParser.js');

export default class JSONParser {

    parseSingleTransaction(rawTransaction) {
        logger.debug('Parsing single JSON transaction:', rawTransaction);
        return new Transaction(
            moment(rawTransaction.Date, moment.ISO_8601),
            rawTransaction.FromAccount,
            rawTransaction.ToAccount,
            rawTransaction.Narrative,
            +rawTransaction.Amount
        );
    }

    getTransactions(data) {
        logger.info('Parsing JSON transactions');
        return JSON.parse(data).map(this.parseSingleTransaction);
    }
}
