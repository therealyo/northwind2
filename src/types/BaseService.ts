import { PrismaClient } from '@prisma/client';
import { QueryLogger } from './../utils/QueryLogger'

export class BaseService {
    public pageSize: number = 20
    public logger: QueryLogger
    protected db: PrismaClient

    constructor(db: PrismaClient) {
        this.logger = new QueryLogger()
        this.db = db
    }
}
