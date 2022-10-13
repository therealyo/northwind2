import { BaseService } from './../types/BaseService';
import { SuppliersTable } from './../data/schema';
import { DB, eq } from 'drizzle-orm';
import { Product, ProductsTable } from '../data/schema';
import { PageResponse } from '../types/PageResponse';
import { QueryLogger } from '../utils/QueryLogger';

export class ProductService extends BaseService {
    private productsTable?: ProductsTable;

    constructor(db: DB) {
        super(db);

        this.initTables(db);
    }

    private initTables = (db: DB) => {
        this.productsTable = new ProductsTable(db);
        this.productsTable.withLogger(this.logger);
    };

    getProductInfo = async (id: number) => {
        const suppliers = new SuppliersTable(this.db);
        const data = await this.productsTable!.select()
            .leftJoin(suppliers, (products, suppliers) => eq(products.SupplierID, suppliers.SupplierID))
            .where((products, suppliers) => eq(products.ProductID, id))
            .execute();

        return data.map((product, supplier) => {
            return { ...product, Supplier: supplier.CompanyName };
        })[0];
    };

    getProductsPage = async (page: number): Promise<PageResponse<Product>> => {
        const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM Products');
        const count = rows[0].count;

        const pageData: Product[] = await this.productsTable!.select()
            .limit(this.pageSize)
            .offset((page - 1) * this.pageSize)
            .execute();

        return { count, page: pageData };
    };
}
