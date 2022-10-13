import { AbstractTable } from 'drizzle-orm';

export interface Service<T extends AbstractTable<T>> {
    table: AbstractTable<T>;
}
