import { Orders } from './Orders';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity("orderdetails")
export class OrderDetails {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    OrderID: number
    @Column()
    ProductID: number
    @Column('decimal')
    UnitPrice: number
    @Column()
    Quantity: number
    @Column('decimal')
    Discount: number

    @ManyToOne(type => Orders, (order) => order.Details)
    @JoinColumn({ name: 'OrderID' })
    order: Orders
}