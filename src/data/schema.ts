import { pgTable, serial, text, varchar, integer, decimal, } from 'drizzle-orm-pg'

export const categories = pgTable('categories', {
    CategoryID: integer('CategoryID').primaryKey(),
    CategoryName: varchar('CategoryName', { length: 100 }),
    Description: varchar('Description', { length: 100 })
})

export const customers = pgTable('customers', {
    CustomerID: varchar('CustomerID', { length: 100 }),
    CompanyName: varchar('CompanyName', { length: 100 }),
    ContactName: varchar('ContactName', { length: 100 }),
    ContactTitle: varchar('ContactTitle', { length: 100 }),
    Address: varchar('Address', { length: 100 }),
    City: varchar('City', { length: 100 }),
    Region: varchar('Region', { length: 100 }),
    PostalCode: varchar('PostalCode', { length: 100 }),
    Country: varchar('Country', { length: 100 }),
    Phone: varchar('Phone', { length: 100 }),
    Fax: varchar('Fax', { length: 100 })
})

export const employees = pgTable('employees', {
    EmployeeID: integer('EmployeeID').primaryKey(),
    LastName: varchar('LastName', { length: 100 }),
    FirstName: varchar('FirstName', { length: 100 }),
    Title: varchar('Title', { length: 100 }),
    TitleOfCourtesy: varchar('TitleOfCourtesy', { length: 100 }),
    BirthDate: varchar('BirthDate', { length: 100 }),
    HireDate: varchar('HireDate', { length: 100 }),
    Address: varchar('Address', { length: 100 }),
    City: varchar('City', { length: 100 }),
    Region: varchar('Region', { length: 100 }),
    PostalCode: varchar('PostalCode', { length: 100 }),
    Country: varchar('Country', { length: 100 }),
    HomePhone: varchar('HomePhone', { length: 100 }),
    Extension: integer('Extension'),
    Notes: text('Notes'),
    ReportsTo: integer('ReportsTo')
})

export const employeeTerritories = pgTable('employeeterritories', {
    EmployeeID: integer('EmployeeID'),
    TerritoryID: integer('TerritoryID')
})

export const orderDetails = pgTable('orderdetails', {
    id: serial('id').primaryKey(),
    OrderID: integer('OrderID'),
    ProductID: integer('ProductID'),
    UnitPrice: decimal('UnitPrice'),
    Quantity: integer('Quantity'),
    Discount: decimal('Discount')
})

export const orders = pgTable('orders', {
    OrderID: integer('OrderID').primaryKey(),
    CustomerID: varchar('CustomerID', { length: 100 }),
    EmployeeID: integer('EmployeeID'),
    OrderDate: varchar('OrderDate', { length: 100 }),
    RequiredDate: varchar('RequiredDate', { length: 100 }),
    ShippedDate: varchar('ShippedDate', { length: 100 }),
    ShipVia: integer('ShipVia'),
    Freight: decimal('Freight'),
    ShipName: varchar('ShipName', { length: 100 }),
    ShipAddress: varchar('ShipAddress', { length: 100 }),
    ShipCity: varchar('ShipCity', { length: 100 }),
    ShipRegion: varchar('ShipRegion', { length: 100 }),
    ShipPostalCode: varchar('ShipPostalCode', { length: 100 }),
    ShipCountry: varchar('ShipCountry', { length: 100 })
})

export const products = pgTable('products', {
    ProductID: integer('ProductID').primaryKey(),
    ProductName: varchar('ProductName', { length: 100 }),
    SupplierID: integer('SupplierID'),
    CategoryID: integer('CategoryID'),
    QuantityPerUnit: varchar('QuantityPerUnit', { length: 100 }),
    UnitPrice: decimal('UnitPrice'),
    UnitsInStock: integer('UnitsInStock'),
    UnitsOnOrder: integer('UnitsOnOrder'),
    ReorderLevel: integer('ReorderLevel'),
    Discontinued: integer('Discontinued')
})

export const regions = pgTable('regions', {
    RegionID: integer('RegionID').primaryKey(),
    RegionDescription: varchar('RegionDescription', { length: 100 })
})

export const shippers = pgTable('shippers', {
    ShipperID: integer('ShipperID').primaryKey(),
    CompanyName: varchar('CompanyName', { length: 100 }),
    Phone: varchar('Phone', { length: 100 })
})

export const suppliers = pgTable('suppliers', {
    SupplierID: integer('SupplierID').primaryKey(),
    CompanyName: varchar('CompanyName'),
    ContactName: varchar('ContactName'),
    ContactTitle: varchar('ContactTitle'),
    Address: varchar('Address'),
    City: varchar('City'),
    Region: varchar('Region'),
    PostalCode: varchar('PostalCode'),
    Country: varchar('Country'),
    Phone: varchar('Phone'),
    Fax: varchar('Fax'),
    HomePage: varchar('HomePage')
})

export const territories = pgTable('territories', {
    TerritoryID: varchar('TerritoryID'),
    TerritoryDescription: varchar('TerritoryDescription'),
    RegionID: integer('RegionID')
})

export const schema = {
    categories,
    customers,
    employees,
    employeeTerritories,
    orderDetails,
    orders,
    products,
    regions,
    shippers,
    suppliers,
    territories
}