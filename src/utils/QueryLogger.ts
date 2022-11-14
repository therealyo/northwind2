import { Metrics } from './Metrics';
// import BaseLogger from 'drizzle-orm/logger/abstractLogger'

type QueryStats = {
    query: string, 
    select: number
    selectWhere: number
    selectJoin: number
    executionTime?: number
}
export class QueryLogger {
    queries: QueryStats[] = []
    startTime: [number, number] = [0, 0];
    endTime: [number, number] = [0, 0];

    private readonly isEmptyString = (str: string) => {
        return str.length === 0
    }

    private readonly countMetrics = (query: string) => {
        if (!this.isEmptyString(query)) {
            const metrics = new Metrics(query.toLowerCase(), this.endTime[1] / 1_000_000)
            this.resetCounter() 
            return {
                query: query,
                ...metrics
            }
        }
    }

    private readonly resetCounter = (): void => {
        this.startTime = [0, 0]
        this.endTime = [0, 0]
    }

    setStart = () => {
        this.startTime = process.hrtime()
    }

    setEnd = () => {
        this.endTime = process.hrtime(this.startTime);
    }

    addQuery = (query: string): void => {
        const parsed = this.countMetrics(query)
        if (parsed) {
            this.queries.push(parsed)
        }
    }

    retrieveQueries = (): QueryStats[] => {
        const temp = [...this.queries]
        this.queries = []
        return temp
    }
}
