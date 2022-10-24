import { sql } from 'drizzle-orm'

import { BaseService } from './../types/BaseService'

export class EmployeeService extends BaseService {

    getEmployeeInfo = async (id: number) => {
        const { rows: employeeInfo } = await this.db.execute(
            sql`SELECT 
            employees."EmployeeID",
            employees."LastName",
            employees."FirstName",
            employees."Title",
            employees."TitleOfCourtesy",
            employees."BirthDate",
            employees."HireDate",
            employees."Address",
            employees."City",
            employees."Region",
            employees."PostalCode",
            employees."Country",
            employees."HomePhone",
            employees."Extension",
            employees."Notes",
            CONCAT(reports."LastName", ' ', reports."FirstName") as "ReportsTo"
            FROM employees LEFT JOIN employees AS reports ON employees."ReportsTo"=reports."EmployeeID" WHERE employees."EmployeeID"=${id}`
        )

        return {
            data: employeeInfo[0]
        }
    }

    getEmployeesPage = async (page: number) => {
        const pageData = await this.db.employees
            .select()
            .limit(this.pageSize)
            .offset(this.pageSize * (page - 1))
            .execute()

        const count = (await this.db.employees.select().execute()).length

        return {
            count,
            page: pageData
        }
    }
}
