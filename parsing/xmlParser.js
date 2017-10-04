import log4js from 'log4js';
import xmldoc from 'xmldoc';
import moment from 'moment';
import 'moment-msdate';
import Transaction from '../bank/transaction';

const logger = log4js.getLogger('xmlParser.js');

export default class XMLParser {

    parseSingleTransaction(rawTransaction) {
        logger.debug('Parsing single XML transaction:', rawTransaction);
        return new Transaction(
            moment.fromOADate(rawTransaction.attr.Date),
            rawTransaction.childNamed('Parties').childNamed('From').val,
            rawTransaction.childNamed('Parties').childNamed('To').val,
            rawTransaction.childNamed('Description').val,
            +rawTransaction.childNamed('Value').val
        );
    }

    getTransactions(data) {
        logger.info('Parsing XML transactions');
        const xml = new xmldoc.XmlDocument(data);
        return xml.childrenNamed('SupportTransaction').map(this.parseSingleTransaction);
    }
}
