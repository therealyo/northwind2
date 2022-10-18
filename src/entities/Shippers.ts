import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class Shippers {
    @PrimaryColumn()
    ShipperID: number
    @Column()
    CompanyName: string
    @Column()
    Phone: string
}