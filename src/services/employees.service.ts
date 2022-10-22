import { Kysely } from 'kysely';
import { DB } from 'kysely-codegen';

import { BaseService } from './../types/BaseService'

export class EmployeeService extends BaseService {
    constructor(db: Kysely<DB>) {
        super(db)
    }

    getEmployeeInfo = async (id: number) => {
        // const infoQuery = this.db
        //     .with('reports', (qb) => {
        //         qb.select(
        //             'EmployeeID as reportID',
        //             'LastName as reportsLastName',
        //             'FirstName as reportsFirstName'
        //         ).from('employees')
        //     })
        //     .select()
        //     .from('employees')
        //     .leftJoin('reports', 'employees.ReportsTo', 'reports.reportID')
        //     .where({ EmployeeID: id })

        // this.logger.addQuery(infoQuery.toQuery())
        // const employeeInfo = await infoQuery.first()

        // return {
        //     queries: this.logger.retrieveQueries(),
        //     data: { 
        //         ...employeeInfo, 
        //         ReportsTo: `${employeeInfo.reportsFirstName} ${employeeInfo.reportsLastName}` 
        //     }
        // }
    }

    getEmployeesPage = async (page: number) => {
        // const countQuery = this.db.queryBuilder().select().from('employees').count()

        // this.logger.addQuery(countQuery.toQuery())
        // const { count } = await countQuery.first()

        // const pageQuery = this.db
        //     .queryBuilder()
        //     .select()
        //     .from('employees')
        //     .limit(this.pageSize)
        //     .offset(this.pageSize * (page - 1))

        // this.logger.addQuery(pageQuery.toQuery())
        // const pageData = await pageQuery

        // return { 
        //     queries: this.logger.retrieveQueries(), 
        //     count, 
        //     page: pageData 
        // }
    }
}
