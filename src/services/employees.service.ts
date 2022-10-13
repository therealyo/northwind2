import { DB, eq } from 'drizzle-orm';
import { PageResponse } from '../types/PageResponse';
import { QueryLogger } from '../utils/QueryLogger';
import { Employee, EmployeesTable } from './../data/schema';
export class EmployeeService {
    public pageSize: number = 20;
    public logger: QueryLogger;
    private table?: EmployeesTable;
    private db: DB;

    constructor(db: DB) {
        this.logger = new QueryLogger();
        this.db = db;
        this.table = new EmployeesTable(db);

        this.table.withLogger(this.logger);
    }

    getEmployeeInfo = async (id: number) => {
        const data = await this.table!.select()
            .leftJoin(this.table!, (employees, joined) => eq(employees.ReportsTo, joined.EmployeeID))
            .where((employees, joined) => eq(employees.EmployeeID, id))
            .execute();

        console.log(data);

        return data.map((employee, joined) => {
            return { ...employee, ReportsTo: `${joined.FirstName} ${joined.LastName}` };
        })[0];
    };

    getEmployeesPage = async (page: number): Promise<PageResponse<Employee>> => {
        const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM employees');
        const count = rows[0].count;

        const pageData: Employee[] = await this.table!.select()
            .limit(20)
            .offset((page - 1) * this.pageSize)
            .execute();

        return { count, page: pageData };
    };
}
