
import fs from "fs";
import csv from 'csv-parser';

let results = [];
function readFile(fileName) {
    fs.createReadStream(fileName)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            console.log("ONE, end:", results.length);
            
        });
    console.log("TWO: returning:", results.length);
    return results;
}

let transactions = readFile('resources/Transactions2014.csv');
console.log("THREE: From readFile:", transactions.length);