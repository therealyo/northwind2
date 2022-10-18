import { Entity, Column } from "typeorm"

@Entity()
export class Orders {
    @Column()
    OrderID: number
    @Column()
    CustomerID: string
    @Column()
    EmployeeID: number
    @Column()
    OrderDate: string
    @Column()
    RequiredDate: string
    @Column()
    ShippedDate: string
    @Column()
    ShipVia: number
    @Column()
    Freight: number
    @Column()
    ShipName: string
    @Column()
    ShipAddress: string
    @Column()
    ShipCity: string
    @Column()
    ShipRegion: string
    @Column()
    ShipPostalCode: string
    @Column()
    ShipCountry: string
}