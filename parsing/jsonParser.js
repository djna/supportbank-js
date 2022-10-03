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

        let rawDataList = JSON.parse(data);
        let transactions = [];
        for ( let i = 0; i < rawDataList.length; i++){
            transactions.push(this.parseSingleTransaction(rawDataList[i]));
        }
        return transactions;

        /* alternative
        return JSON.parse(data).map(this.parseSingleTransaction);
        */
    }
}
