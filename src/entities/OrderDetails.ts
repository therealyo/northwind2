import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class OrderDetails {
    @PrimaryColumn()
    OrderID: number
    @Column()
    ProductID: number
    @Column('decimal')
    UnitPrice: number
    @Column()
    Quantity: number
    @Column('decimal')
    Discount: number
}