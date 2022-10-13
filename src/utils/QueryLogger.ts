import BaseLogger from 'drizzle-orm/logger/abstractLogger';

export class QueryLogger extends BaseLogger {
    queries: string[] = [];

    info = (msg: string): void => {
        // this.queries.push(msg.split(' ')[1]);
        console.log(msg);
    };

    error(msg: string): void {
        console.log(msg);
    }

    addQuery = (query: string): void => {
        this.queries.push(query);
    };

    retrieveQueries = (): string[] => {
        const temp = [...this.queries];
        this.queries = [];
        return temp;
    };
}
