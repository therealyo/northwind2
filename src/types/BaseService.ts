import { Kysely } from 'kysely';
import { DB } from 'kysely-codegen';
import { QueryLogger } from './../utils/QueryLogger'

export class BaseService {
    public pageSize: number = 20
    public logger: QueryLogger
    protected db: Kysely<DB>

    constructor(db: Kysely<DB>) {
        this.logger = new QueryLogger()
        this.db = db
    }
}
