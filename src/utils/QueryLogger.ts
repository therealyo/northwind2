import BaseLogger from 'drizzle-orm/logger/abstractLogger';

export class QueryLogger extends BaseLogger {
    queries: string[] = [];

    info(msg: string): void {
        console.log(msg);
    }
    error(msg: string): void {
        console.log(msg);
    }
}
