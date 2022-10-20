import { PrismaClient } from '@prisma/client';

import { BaseService } from './../types/BaseService'

export class EmployeeService extends BaseService {
    constructor(db: PrismaClient) {
        super(db)
    }

    getEmployeeInfo = async (id: number) => {
        const employeeInfo = await this.db.employees.findUnique({
            where: {
                EmployeeID: id
            },
            include: {
                Reports: true
            }
        })

        return {
            data: {
                ...employeeInfo,
                Reports: `${employeeInfo?.Reports!.FirstName} ${employeeInfo?.Reports!.LastName}`
            }
        }
    }

    getEmployeesPage = async (page: number) => {
        const count = await this.db.employees.count()
        const pageData = await this.db.employees.findMany({
            take: this.pageSize,
            skip: this.pageSize * (page - 1)
        })

        return {
            count,
            page: pageData
        }
    }
}
