import { readFileSync } from 'fs';
import csvParseSync from 'csv-parse/lib/sync';
import moment from 'moment';
import Transaction from './transaction';

function parseRecordToTransaction(record) {
    return new Transaction(
        moment(record.Date, 'DD/MM/YYYY'),
        record.From,
        record.To,
        record.Narrative,
        +record.Amount
    );
}

export default function getTransactions(filePath, encoding) {
    const data = readFileSync(filePath, {encoding});
    return csvParseSync(data, {columns: true}).map(parseRecordToTransaction);
}
