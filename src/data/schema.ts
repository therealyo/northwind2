// import { AbstractTable } from 'drizzle-orm'
// import { InferType } from 'drizzle-orm/tables/inferTypes'

// export class CategoriesTable extends AbstractTable<CategoriesTable> {
//     public CategoryID = this.int('CategoryID').primaryKey()
//     public CategoryName = this.varchar('CategoryName', { size: 100 })
//     public Description = this.varchar('Description', { size: 100 })

//     public tableName(): string {
//         return 'Categories'
//     }
// }

// export class CustomersTable extends AbstractTable<CustomersTable> {
//     public CustomerID = this.varchar('CustomerID', { size: 20 }).primaryKey()
//     public CompanyName = this.varchar('CompanyName', { size: 100 })
//     public ContactName = this.varchar('ContactName', { size: 100 })
//     public ContactTitle = this.varchar('ContactTitle', { size: 100 })
//     public Address = this.varchar('Address', { size: 100 })
//     public City = this.varchar('City', { size: 100 })
//     public Region = this.varchar('Region', { size: 100 })
//     public PostalCode = this.varchar('PostalCode', { size: 100 })
//     public Country = this.varchar('Country', { size: 100 })
//     public Phone = this.varchar('Phone', { size: 100 })
//     public Fax = this.varchar('Fax', { size: 100 })

//     public tableName(): string {
//         return 'Customers'
//     }
// }

// export class EmployeesTable extends AbstractTable<EmployeesTable> {
//     public EmployeeID = this.int('EmployeeID').primaryKey()
//     public LastName = this.varchar('LastName', { size: 100 })
//     public FirstName = this.varchar('FirstName', { size: 100 })
//     public Title = this.varchar('Title', { size: 100 })
//     public TitleOfCourtesy = this.varchar('TitleOfCourtesy', { size: 100 })
//     public BirthDate = this.varchar('BirthDate', { size: 100 })
//     public HireDate = this.varchar('HireDate', { size: 100 })
//     public Address = this.varchar('Address', { size: 100 })
//     public City = this.varchar('City', { size: 100 })
//     public Region = this.varchar('Region', { size: 100 })
//     public PostalCode = this.varchar('PostalCode', { size: 100 })
//     public Country = this.varchar('Country', { size: 100 })
//     public HomePhone = this.varchar('HomePhone', { size: 100 })
//     public Extension = this.int('Extension')
//     public Notes = this.varchar('Notes', { size: 500 })
//     public ReportsTo = this.int('ReportsTo')

//     public tableName(): string {
//         return 'Employees'
//     }
// }

// export class EmployeeTerritoriesTable extends AbstractTable<EmployeeTerritoriesTable> {
//     public EmployeeID = this.int('EmployeeID')
//     public TerritoryID = this.int('TerritoryID')

//     public tableName(): string {
//         return 'EmployeeTerritories'
//     }
// }

// export class OrderDetailsTable extends AbstractTable<OrderDetailsTable> {
//     public id = this.serial("id").primaryKey()
//     public OrderID = this.int('OrderID')
//     public ProductID = this.int('ProductID')
//     public UnitPrice = this.decimal('UnitPrice')
//     public Quantity = this.int('Quantity')
//     public Discount = this.decimal('Discount')

//     public tableName(): string {
//         return 'OrderDetails'
//     }
// }

// export class OrdersTable extends AbstractTable<OrdersTable> {
//     public OrderID = this.int('OrderID').primaryKey()
//     public CustomerID = this.varchar('CustomerID', { size: 5 })
//     public EmployeeID = this.int('EmployeeID')
//     public OrderDate = this.varchar('OrderDate', { size: 100 })
//     public RequiredDate = this.varchar('RequiredDate', { size: 100 })
//     public ShippedDate = this.varchar('ShippedDate', { size: 100 })
//     public ShipVia = this.int('ShipVia')
//     public Freight = this.decimal('Freight')
//     public ShipName = this.varchar('ShipName', { size: 100 })
//     public ShipAddress = this.varchar('ShipAddress', { size: 100 })
//     public ShipCity = this.varchar('ShipCity', { size: 100 })
//     public ShipRegion = this.varchar('ShipRegion', { size: 100 })
//     public ShipPostalCode = this.varchar('ShipPostalCode', { size: 100 })
//     public ShipCountry = this.varchar('ShipCountry', { size: 100 })

//     tableName(): string {
//         return 'Orders'
//     }
// }

// export class ProductsTable extends AbstractTable<ProductsTable> {
//     public ProductID = this.int('ProductID').primaryKey()
//     public ProductName = this.varchar('ProductName', { size: 100 })
//     public SupplierID = this.int('SupplierID')
//     public CategoryID = this.int('CategoryID')
//     public QuantityPerUnit = this.varchar('QuantityPerUnit', { size: 100 })
//     public UnitPrice = this.decimal('UnitPrice')
//     public UnitsInStock = this.int('UnitsInStock')
//     public UnitsOnOrder = this.int('UnitsOnOrder')
//     public ReorderLevel = this.int('ReorderLevel')
//     public Discontinued = this.int('Discontinued')

//     tableName(): string {
//         return 'Products'
//     }
// }

// export class RegionsTable extends AbstractTable<RegionsTable> {
//     public RegionID = this.int('RegionID').primaryKey()
//     public RegionDescription = this.varchar('RegionDescription', { size: 30 })

//     tableName(): string {
//         return 'Regions'
//     }
// }

// export class ShippersTable extends AbstractTable<ShippersTable> {
//     public ShipperID = this.int('ShipperID').primaryKey()
//     public CompanyName = this.varchar('CompanyName', { size: 100 })
//     public Phone = this.varchar('Phone', { size: 50 })

//     tableName(): string {
//         return 'Shippers'
//     }
// }

// export class SuppliersTable extends AbstractTable<SuppliersTable> {
//     public SupplierID = this.int('SupplierID').primaryKey()
//     public CompanyName = this.varchar('CompanyName', { size: 100 })
//     public ContactName = this.varchar('ContactName', { size: 100 })
//     public ContactTitle = this.varchar('ContactTitle', { size: 100 })
//     public Address = this.varchar('Address', { size: 100 })
//     public City = this.varchar('City', { size: 100 })
//     public Region = this.varchar('Region', { size: 100 })
//     public PostalCode = this.varchar('PostalCode', { size: 100 })
//     public Country = this.varchar('Country', { size: 100 })
//     public Phone = this.varchar('Phone', { size: 100 })
//     public Fax = this.varchar('Fax', { size: 100 })
//     public HomePage = this.varchar('HomePage', { size: 100 })

//     tableName(): string {
//         return 'Suppliers'
//     }
// }
// export class TerritoriesTable extends AbstractTable<TerritoriesTable> {
//     public TerritoryID = this.varchar('TerritoryID', { size: 10 }).primaryKey()
//     public TerritoryDescription = this.varchar('TerritoryDescription', { size: 50 })
//     public RegionID = this.int('RegionID')

//     tableName(): string {
//         return 'Territories'
//     }
// }

// export type Category = InferType<CategoriesTable>
// export type Customer = InferType<CustomersTable>
// export type Employee = InferType<EmployeesTable>
// export type EmployeeTerritory = InferType<EmployeeTerritoriesTable>
// export type OrderDetail = InferType<OrderDetailsTable>
// export type Order = InferType<OrdersTable>
// export type Product = InferType<ProductsTable>
// export type Region = InferType<RegionsTable>
// export type Shipper = InferType<ShippersTable>
// export type Supplier = InferType<SuppliersTable>
// export type Terrytory = InferType<TerritoriesTable>
