import { DB, eq } from 'drizzle-orm';

import { PageResponse } from '../types/PageResponse';
import { Employee, EmployeesTable } from './../data/schema';
import { BaseService } from './../types/BaseService';
export class EmployeeService extends BaseService {
    private employeesTable?: EmployeesTable;

    constructor(db: DB) {
        super(db);
        this.initTables(db);
    }

    private initTables = (db: DB) => {
        this.employeesTable = new EmployeesTable(db);
        this.employeesTable.withLogger(this.logger);
    };

    getEmployeeInfo = async (id: number) => {
        const data = await this.employeesTable!.select()
            .leftJoin(this.employeesTable!, (employees, joined) => eq(employees.ReportsTo, joined.EmployeeID))
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

        const pageData: Employee[] = await this.employeesTable!.select()
            .limit(this.pageSize)
            .offset((page - 1) * this.pageSize)
            .execute();

        return { count, page: pageData };
    };
}
