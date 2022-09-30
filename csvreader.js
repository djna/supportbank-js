import { readFileSync } from 'fs';
import {parse as csvParseSync} from 'csv-parse/sync';
import moment from 'moment';
import Transaction from './transaction.js';

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
