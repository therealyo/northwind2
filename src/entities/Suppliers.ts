import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity()
export class Suppliers {
    @PrimaryColumn()
    SupplierID: number
    @Column()
    CompanyName: string
    @Column()
    ContactName: string
    @Column()
    ContactTitle: string
    @Column()
    Address: string
    @Column()
    City: string
    @Column()
    Region: string
    @Column()
    PostalCode: string
    @Column()
    Country: string
    @Column()
    Phone: string
    @Column()
    Fax: string
    @Column()
    HomePage: string
}
