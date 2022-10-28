import { PGDatabase } from 'drizzle-orm-pg'
import { QueryLogger } from './../utils/QueryLogger'
import { schema } from './../data/schema';

export class BaseService {
    public pageSize: number = 20
    public logger: QueryLogger
    protected db: PGDatabase<typeof schema>

    constructor(db: PGDatabase<typeof schema>) {
        this.logger = new QueryLogger()
        this.db = db
    }
}
