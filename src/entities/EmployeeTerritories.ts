import { Entity, Column } from "typeorm"

@Entity()
export class EmployeeTerritories {
    @Column()
    EmployeeID: number
    @Column()
    TerritoryID: number
}