export class Metrics {
    select: number = 0;
    selectWhere: number = 0;
    selectJoin: number = 0;
    executionTime?: number = 0;

    constructor (query: string, executionTime: number) {
        this.select = this.countOccurences(query, "select")
        this.selectWhere = this.countOccurences(query, "where")
        this.selectJoin = this.countOccurences(query, "join")
        this.executionTime = executionTime
    }

    countOccurences(str: string, subStr: string): number {
        return (str.match(new RegExp(subStr, "g")) || []).length
    }
}