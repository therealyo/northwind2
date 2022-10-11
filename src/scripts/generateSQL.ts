import { convertCSVtoSQLScript, getCSVS, readCSV } from './../libs/csvToSql';

const generateSQLFromCSVS = async () => {
    const files = await getCSVS('csvs');
    console.log(files);
    console.log(await convertCSVtoSQLScript(files![1]));
    // files?.forEach(async (file) => {
    //     console.log(await convertCSVtoSQLScript(file));
    // });
};

generateSQLFromCSVS();
