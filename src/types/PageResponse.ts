export interface PageResponse<T> {
    queries: string[];
    count: string;
    page: T[];
}
