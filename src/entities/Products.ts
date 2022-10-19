import { Suppliers } from './Suppliers'
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm'

@Entity()
export class Products {
    @PrimaryColumn()
    ProductID: number
    @Column()
    ProductName: string
    @Column()
    SupplierID: number
    @Column()
    CategoryID: number
    @Column()
    QuantityPerUnit: string
    @Column()
    UnitPrice: number
    @Column()
    UnitsInStock: number
    @Column()
    UnitsOnOrder: number
    @Column()
    ReorderLevel: number
    @Column()
    Discontinued: number

    @ManyToOne((type) => Suppliers, (supplier) => supplier.Products)
    @JoinColumn({ name: 'SupplierID' })
    Supplier: Suppliers
}
