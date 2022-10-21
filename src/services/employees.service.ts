import { Knex } from 'knex';

import { BaseService } from './../types/BaseService'

export class EmployeeService extends BaseService {

    constructor(db: Knex) {
        super(db)
    }



    getEmployeeInfo = async (id: number) => {
        // const data = await this.employeesTable!.select()
        //     .leftJoin(this.employeesTable!, (employees, joined) => eq(employees.ReportsTo, joined.EmployeeID))
        //     .where((employees, joined) => eq(employees.EmployeeID, id))
        //     .execute()

        // const employeeInfo = data.map((employee, joined) => {
        //     return { 
        //         ...employee, 
        //         ReportsTo: `${joined.FirstName} ${joined.LastName}` 
        //     }
        // })[0] as Employee & { ReportsTo: string }

        // return {
        //     queries: this.logger.retrieveQueries(),
        //     data: employeeInfo
        // }
    }

    getEmployeesPage = async (page: number) => {
        // const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM employees')
        // const count = rows[0].count

        // this.logger.addQuery('SELECT COUNT(*) FROM employees')

        // const pageData: Employee[] = await this.employeesTable!.select()
        //     .limit(this.pageSize)
        //     .offset((page - 1) * this.pageSize)
        //     .execute()

        // return { 
        //     queries: this.logger.retrieveQueries(), 
        //     count, 
        //     page: pageData }
    }
}
