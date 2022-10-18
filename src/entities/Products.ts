import { Entity, PrimaryColumn, Column } from "typeorm"

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
}