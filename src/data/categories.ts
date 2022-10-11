import { AbstractTable } from 'drizzle-orm';
import { InferType } from 'drizzle-orm/tables/inferTypes';

export class CategoriesTable extends AbstractTable<CategoriesTable> {
    public categoryId = this.int('CategoryID').primaryKey();
    public categoryName = this.varchar('CategoryName', { size: 256 });
    public description = this.varchar('Description', { size: 256 });

    public tableName(): string {
        return 'Categories';
    }
}

export type Category = InferType<CategoriesTable>;
