import { Shippers } from './Shippers';
import { OrderDetails } from './OrderDetails';
import { Entity, Column, PrimaryColumn, OneToMany, OneToOne, ManyToOne, JoinColumn } from "typeorm"

@Entity()
export class Orders {
    @PrimaryColumn()
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

    @OneToMany(type => OrderDetails, (detail) => detail.order)
    Details: OrderDetails[]

    @ManyToOne(type => Shippers, (shipper) => shipper.Orders)
    @JoinColumn({name: "ShipVia"})
    Shipper: Shippers

    
}