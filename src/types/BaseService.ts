import { DB } from 'drizzle-orm';
import { QueryLogger } from './../utils/QueryLogger';

export class BaseService {
    public pageSize: number = 20;
    public logger: QueryLogger;
    protected db: DB;

    constructor(db: DB) {
        this.logger = new QueryLogger();
        this.db = db;
    }
}
