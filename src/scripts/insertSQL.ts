import { convertCSVtoSQL, getCSVS } from '../libs/csvToSql';

const generateSQLFromCSVS = async () => {
    const files = await getCSVS('csvs');
    await Promise.all(
        files?.map(async (file) => {
            await convertCSVtoSQL(file);
        })
    );

    return 'success';
};

const main = async () => {
    console.log(await generateSQLFromCSVS());
    process.exit(0);
};

main();
