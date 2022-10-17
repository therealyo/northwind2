import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class Categories {
    @PrimaryColumn()
    CategoryID: number

    @Column()
    CategoryName: string

    @Column()
    Description: string
}

@Entity()
export class Customers {
    @PrimaryColumn()
    CustomerID: string
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
}

@Entity()
export class Employees {
    @PrimaryColumn()
    EmployeeID: number
    @Column()
    LastName: string
    @Column()
    FirstName: string
    @Column()
    Title: string
    @Column()
    TitleOfCourtesy: string
    @Column()
    BirthDate: string
    @Column()
    HireDate: string
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
    HomePhone: string
    @Column()
    Extension: number
    @Column()
    Notes: string
    @Column()
    ReportsTo: number
}

@Entity()
export class EmployeeTerritories {
    @Column()
    EmployeeID: number
    @Column()
    TerritoryID: number
}

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

@Entity()
export class Regions {
    @PrimaryColumn()
    RegionID: number
    @Column()
    RegionDescription: string
}

@Entity()
export class Shippers {
    @PrimaryColumn()
    ShipperID: number
    @Column()
    CompanyName: string
    @Column()
    Phone: string
}

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

@Entity()
export class Territories {
    @PrimaryColumn()
    TerritoryID: string
    @Column()
    TerritoryDescription: string
    @Column()
    RegionID: number
}

