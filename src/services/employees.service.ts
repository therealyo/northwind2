// import { ItemInfo } from './../types/ItemInfo'
// import { DB, eq } from ''

// import { PageResponse } from '../types/PageResponse'
// import { BaseService } from './../types/BaseService'
// import { Employee, EmployeesTable } from './../data/schema'

// export class EmployeeService extends BaseService {
//     private employeesTable?: EmployeesTable

//     constructor(db: DB) {
//         super(db)
//         this.initTables(db)
//     }

//     private readonly initTables = (db: DB): void => {
//         this.employeesTable = new EmployeesTable(db)
//         this.employeesTable.withLogger(this.logger)
//     }

//     getEmployeeInfo = async (id: number): Promise<ItemInfo<Employee>> => {
//         const data = await this.employeesTable!.select()
//             .leftJoin(this.employeesTable!, (employees, joined) => eq(employees.ReportsTo, joined.EmployeeID))
//             .where((employees, joined) => eq(employees.EmployeeID, id))
//             .execute()

//         const employeeInfo = data.map((employee, joined) => {
//             return { 
//                 ...employee, 
//                 ReportsTo: `${joined.FirstName} ${joined.LastName}` 
//             }
//         })[0] as Employee & { ReportsTo: string }

//         return {
//             queries: this.logger.retrieveQueries(),
//             data: employeeInfo
//         }
//     }

//     getEmployeesPage = async (page: number): Promise<PageResponse<Employee>> => {
//         const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM employees')
//         const count = rows[0].count

//         this.logger.addQuery('SELECT COUNT(*) FROM employees')

//         const pageData: Employee[] = await this.employeesTable!.select()
//             .limit(this.pageSize)
//             .offset((page - 1) * this.pageSize)
//             .execute()

//         return { 
//             queries: this.logger.retrieveQueries(), 
//             count, 
//             page: pageData }
//     }
// }
