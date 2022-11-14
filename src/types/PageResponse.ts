export interface PageResponse<T> {
    queries: string[]
    total: string
    page: T[]
}
