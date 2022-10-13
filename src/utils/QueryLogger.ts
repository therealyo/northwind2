import BaseLogger from 'drizzle-orm/logger/abstractLogger';

export class QueryLogger extends BaseLogger {
    queries: string[] = [];

    private isEmptyString = (str: string) => {
        return str.length === 0;
    };

    private parseQuery = (query: string) => {
        return query.split('\n').slice(1).join(' ').trim().replace(/  +/g, ' ');
    };

    info = (msg: string): void => {
        const parsed = this.parseQuery(msg);
        console.log(parsed);
        if (!this.isEmptyString(parsed)) {
            this.queries.push(parsed);
        }
    };

    error(msg: string): void {
        console.log(msg);
    }

    addQuery = (query: string): void => {
        this.queries.push(query.replace(/  +/g, ' '));
    };

    retrieveQueries = (): string[] => {
        const temp = [...this.queries];
        this.queries = [];
        return temp;
    };
}
