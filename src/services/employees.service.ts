import { DataSource } from 'typeorm'

import { Employees } from './../entities/Employees'
import { BaseService } from './../types/BaseService'

export class EmployeeService extends BaseService {
    constructor(db: DataSource) {
        super(db)
    }

    getEmployeeInfo = async (id: number) => {
        const queryBuilder = this.db
            .createQueryBuilder(Employees, 'employees')
            .leftJoinAndSelect('employees.Reports', 'empl')
            .where('employees.EmployeeID = :id', { id: id })

        const employeeInfo = await queryBuilder.getOne()
        this.logger.addQuery(queryBuilder.getQuery())

        return {
            queries: this.logger.retrieveQueries(),
            data: {
                ...employeeInfo,
                Reports: `${employeeInfo?.Reports.FirstName} ${employeeInfo?.Reports.LastName}`
            }
        }
    }

    getEmployeesPage = async (page: number) => {
        const queryBuilder = this.db.createQueryBuilder(Employees, "employees")

        const count = await queryBuilder.getCount()
        this.logger.addQuery('SELECT COUNT(*) FROM employees')

        const pageBuilder = queryBuilder.limit(this.pageSize).offset()
        this.logger.addQuery(pageBuilder.getQuery())

        const pageData = await pageBuilder.getMany()
        
        return {
            queries: this.logger.retrieveQueries(),
            count,
            page: pageData
        }
    }
}
