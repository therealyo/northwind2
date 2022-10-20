import { Employees } from './../entities/Employees'
import { DataSource } from 'typeorm'
import { ItemInfo } from './../types/ItemInfo'
// import { DB, eq } from 'drizzle-orm'

import { PageResponse } from '../types/PageResponse'
import { BaseService } from './../types/BaseService'
// import { Employee, EmployeesTable } from './../data/schema'

export class EmployeeService extends BaseService {
    // private employeesTable?: EmployeesTable

    constructor(db: DataSource) {
        super(db)
        // this.initTables(db)
    }

    // private readonly initTables = (db: DB): void => {
    //     this.employeesTable = new EmployeesTable(db)
    //     this.employeesTable.withLogger(this.logger)
    // }

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
        const queryBuilder = this.db
            .createQueryBuilder(Employees, 'employees')
            .leftJoinAndSelect('employees.Reports', 'empl')
            .where('employees.EmployeeID = :id', { id: id })

        const employeeInfo = await queryBuilder.getOne()
        this.logger.addQuery(queryBuilder.getQuery())
        console.log(employeeInfo)
        return {
            queries: this.logger.retrieveQueries(),
            data: {
                ...employeeInfo,
                Reports: `${employeeInfo?.Reports.FirstName} ${employeeInfo?.Reports.LastName}`
            }
        }
    }

    getEmployeesPage = async (page: number) => {
        // const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM employees')
        // const count = rows[0].count

        this.logger.addQuery('SELECT COUNT(*) FROM employees')

        // const pageData: Employee[] = await this.employeesTable!.select()
        //     .limit(this.pageSize)
        //     .offset((page - 1) * this.pageSize)
        //     .execute()

        return {
            queries: this.logger.retrieveQueries()
            // count,
            // page: pageData
        }
    }
}
