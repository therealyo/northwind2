import { DataSource } from 'typeorm';
// import { DB } from 'drizzle-orm'
import { QueryLogger } from './../utils/QueryLogger'

export class BaseService {
    public readonly pageSize: number = 20
    public logger: QueryLogger
    protected db: DataSource

    constructor(db: DataSource) {
        this.logger = new QueryLogger()
        this.db = db
    }
}
