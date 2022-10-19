import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class EmployeeTerritories {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    EmployeeID: number
    @Column()
    TerritoryID: number
}