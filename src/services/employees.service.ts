import { Kysely } from 'kysely'
import { DB } from 'kysely-codegen'

import { BaseService } from './../types/BaseService'

export class EmployeeService extends BaseService {
    constructor(db: Kysely<DB>) {
        super(db)
    }

    getEmployeeInfo = async (id: number) => {
        const customerInfo = await this.db
            .selectFrom('employees')
            .leftJoin('employees as reports', 'employees.ReportsTo', 'reports.EmployeeID')
            .select([
                'employees.EmployeeID',
                'employees.FirstName',
                'employees.LastName',
                'employees.Title',
                'employees.TitleOfCourtesy',
                'employees.BirthDate',
                'employees.HireDate',
                'employees.Address',
                'employees.City',
                'employees.PostalCode',
                'employees.Country',
                'employees.HomePhone',
                'employees.Extension',
                'employees.Notes',
                'reports.FirstName as reportsFirstName',
                'reports.LastName as reportstLastName'
            ])
            .where('employees.EmployeeID', '=', id)
            .executeTakeFirst()

        return {
            data: {
                ...customerInfo,
                ReportsTo: `${customerInfo!.reportsFirstName} ${customerInfo!.reportstLastName}`
            }
        }
    }

    getEmployeesPage = async (page: number) => {
        const count = await this.db.selectFrom('employees').selectAll().execute()
        const pageData = await this.db
            .selectFrom('employees')
            .selectAll()
            .limit(this.pageSize)
            .offset(this.pageSize * (page - 1))
            .execute()

        return {
            count: count.length,
            page: pageData
        }
    }
}
