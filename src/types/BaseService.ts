import { Knex } from 'knex';
import { QueryLogger } from './../utils/QueryLogger'

export class BaseService {
    public pageSize: number = 20
    public logger: QueryLogger
    protected db: Knex

    constructor(db: Knex) {
        this.logger = new QueryLogger()
        this.db = db
    }
}
