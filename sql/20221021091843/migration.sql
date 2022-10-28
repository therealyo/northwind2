CREATE TABLE IF NOT EXISTS Categories (
	"CategoryID" INT PRIMARY KEY,
	"CategoryName" character varying(100),
	"Description" character varying(100)
);

CREATE TABLE IF NOT EXISTS Customers (
	"CustomerID" character varying(20) PRIMARY KEY,
	"CompanyName" character varying(100),
	"ContactName" character varying(100),
	"ContactTitle" character varying(100),
	"Address" character varying(100),
	"City" character varying(100),
	"Region" character varying(100),
	"PostalCode" character varying(100),
	"Country" character varying(100),
	"Phone" character varying(100),
	"Fax" character varying(100)
);

CREATE TABLE IF NOT EXISTS EmployeeTerritories (
	"EmployeeID" INT,
	"TerritoryID" INT
);

CREATE TABLE IF NOT EXISTS Employees (
	"EmployeeID" INT PRIMARY KEY,
	"LastName" character varying(100),
	"FirstName" character varying(100),
	"Title" character varying(100),
	"TitleOfCourtesy" character varying(100),
	"BirthDate" character varying(100),
	"HireDate" character varying(100),
	"Address" character varying(100),
	"City" character varying(100),
	"Region" character varying(100),
	"PostalCode" character varying(100),
	"Country" character varying(100),
	"HomePhone" character varying(100),
	"Extension" INT,
	"Notes" character varying(500),
	"ReportsTo" INT
);

CREATE TABLE IF NOT EXISTS OrderDetails (
	"id" SERIAL PRIMARY KEY,
	"OrderID" INT,
	"ProductID" INT,
	"UnitPrice" numeric,
	"Quantity" INT,
	"Discount" numeric
);

CREATE TABLE IF NOT EXISTS Orders (
	"OrderID" INT PRIMARY KEY,
	"CustomerID" character varying(5),
	"EmployeeID" INT,
	"OrderDate" character varying(100),
	"RequiredDate" character varying(100),
	"ShippedDate" character varying(100),
	"ShipVia" INT,
	"Freight" numeric,
	"ShipName" character varying(100),
	"ShipAddress" character varying(100),
	"ShipCity" character varying(100),
	"ShipRegion" character varying(100),
	"ShipPostalCode" character varying(100),
	"ShipCountry" character varying(100)
);

CREATE TABLE IF NOT EXISTS Products (
	"ProductID" INT PRIMARY KEY,
	"ProductName" character varying(100),
	"SupplierID" INT,
	"CategoryID" INT,
	"QuantityPerUnit" character varying(100),
	"UnitPrice" numeric,
	"UnitsInStock" INT,
	"UnitsOnOrder" INT,
	"ReorderLevel" INT,
	"Discontinued" INT
);

CREATE TABLE IF NOT EXISTS Regions (
	"RegionID" INT PRIMARY KEY,
	"RegionDescription" character varying(30)
);

CREATE TABLE IF NOT EXISTS Shippers (
	"ShipperID" INT PRIMARY KEY,
	"CompanyName" character varying(100),
	"Phone" character varying(50)
);

CREATE TABLE IF NOT EXISTS Suppliers (
	"SupplierID" INT PRIMARY KEY,
	"CompanyName" character varying(100),
	"ContactName" character varying(100),
	"ContactTitle" character varying(100),
	"Address" character varying(100),
	"City" character varying(100),
	"Region" character varying(100),
	"PostalCode" character varying(100),
	"Country" character varying(100),
	"Phone" character varying(100),
	"Fax" character varying(100),
	"HomePage" character varying(100)
);

CREATE TABLE IF NOT EXISTS Territories (
	"TerritoryID" character varying(10) PRIMARY KEY,
	"TerritoryDescription" character varying(50),
	"RegionID" INT
);