import fs from 'fs/promises';
import { drizzle } from 'drizzle-orm';

const getTableName = (fileName: string) => {
    return fileName.split('.').at(0);
};

const filterCSV = (fileName: string) => {
    return fileName.split('.').at(-1) === 'csv';
};

const parseString = (row: string) => {
    const rowArray = row.split(',');
    rowArray.map((el) => {
        // console.log(el);
        const numeric = parseInt(el);
        // console.log('number: ', numeric);
        if (numeric) {
            return numeric;
        } else {
            // console.log('element: ', `\"${el}\"`);
            console.log(el);
            return el;
        }
    });

    console.log(rowArray);
    return `(${rowArray.join(',')})`;
};

export const getCSVS = async (dirname: string) => {
    try {
        return (await fs.readdir(dirname)).filter(filterCSV);
    } catch (err) {
        console.log(err);
    }
};

export const readCSV = async (fileName: string) => {
    try {
        const csv = (await fs.readFile('csvs/' + fileName, 'utf-8')).split('\n');

        return {
            rows: csv[0],
            rowsData: csv.slice(1, csv.length)
        };
    } catch (err) {
        console.log(err);
    }
};

export const convertCSVtoSQLScript = async (fileName: string) => {
    try {
        const { rows, rowsData } = (await readCSV(fileName))!;

        const query = `INSERT INTO ${getTableName(fileName)} (${rows}) VALUES ${rowsData
            .slice(0, 20)
            .map((row: string) => {
                return parseString(row);
            })
            .join(',')}`;
        return query;
    } catch (err) {
        console.log(err);
    }
};
