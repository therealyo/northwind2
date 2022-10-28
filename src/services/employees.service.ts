import { sql } from 'drizzle-orm'

import { BaseService } from './../types/BaseService'

export class EmployeeService extends BaseService {

    getEmployeeInfo = async (id: number) => {
        this.logger.setStart()
        const rawQuery = sql`SELECT \
                                employees."EmployeeID", \
                                employees."LastName", \
                                employees."FirstName", \
                                employees."Title", \ 
                                employees."TitleOfCourtesy", \
                                employees."BirthDate", \
                                employees."HireDate", \
                                employees."Address", \
                                employees."City", \
                                employees."Region", \
                                employees."PostalCode", \ 
                                employees."Country", \ 
                                employees."HomePhone", \
                                employees."Extension", \
                                employees."Notes", \
                                CONCAT(reports."LastName", ' ', reports."FirstName") as "ReportsTo" \
                            FROM employees \
                                LEFT JOIN employees AS reports \
                                    ON employees."ReportsTo"=reports."EmployeeID" \ 
                                        WHERE employees."EmployeeID"=${id}` 
        const { rows: employeeInfo } = await this.db.execute(
            rawQuery
        )
        this.logger.setEnd()
        this.logger.addQuery(rawQuery.getSQL().queryChunks[0].toString().replace(/  +/g, ' '))

        return {
            queries: this.logger.retrieveQueries(),
            data: employeeInfo[0]
        }
    }

    getEmployeesPage = async (page: number) => {
        this.logger.setStart()
        const pageQuery = this.db.employees
            .select()
            .limit(this.pageSize)
            .offset(this.pageSize * (page - 1))
        const pageData = await pageQuery.execute()
        this.logger.setEnd()
        this.logger.addQuery(pageQuery.getQuery().sql)

        this.logger.setStart()
        const countQuery = this.db.employees.select()
        const count = (await countQuery.execute()).length
        this.logger.setEnd()
        this.logger.addQuery(countQuery.getQuery().sql)

        return {
            queries: this.logger.retrieveQueries(),
            count,
            page: pageData
        }
    }
}
