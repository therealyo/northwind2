import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn } from "typeorm"
import { Orders } from "./Orders"

@Entity()
export class Shippers {
    @PrimaryColumn()
    ShipperID: number
    @Column()
    CompanyName: string
    @Column()
    Phone: string

    @OneToMany(type => Orders, (order) => order.Shipper)
    @JoinColumn({name: "ShipperID"})
    Orders: Orders[]
}