import { SuppliersTable } from './../data/schema';
import { DB, eq } from 'drizzle-orm';
import { Product, ProductsTable } from '../data/schema';
import { PageResponse } from '../types/PageResponse';
import { QueryLogger } from '../utils/QueryLogger';

export class ProductService {
    public pageSize: number = 20;
    public logger: QueryLogger;
    private table?: ProductsTable;
    private db: DB;

    constructor(db: DB) {
        this.logger = new QueryLogger();
        this.db = db;
        this.table = new ProductsTable(db);

        this.table.withLogger(this.logger);
    }

    getProductInfo = async (id: number) => {
        const suppliers = new SuppliersTable(this.db);
        const data = await this.table!.select()
            .leftJoin(suppliers, (products, suppliers) => eq(products.SupplierID, suppliers.SupplierID))
            .where((products, suppliers) => eq(products.ProductID, id))
            .execute();

        return data.map((product, supplier) => {
            return { ...product, Supplier: supplier.CompanyName };
        });
    };

    getProductsPage = async (page: number): Promise<PageResponse<Product>> => {
        const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM Products');
        const count = rows[0].count;

        const pageData: Product[] = await this.table!.select()
            .limit(20)
            .offset((page - 1) * this.pageSize)
            .execute();

        return { count, pageData };
    };
}
