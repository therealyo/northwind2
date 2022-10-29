ALTER TABLE customers
    ADD COLUMN customers_with_rankings tsvector;
UPDATE customers SET customers_with_rankings = 
    setweight(to_tsvector("CustomerID"), 'AA') ||
    setweight(to_tsvector("CompanyName"), 'AB') ||
    setweight(to_tsvector("ContactName"), 'AC') ||
    setweight(to_tsvector("ContactTitle"), 'AD') ||
    setweight(to_tsvector("Address"), 'BA');

ALTER TABLE products
    ADD COLUMN products_ranking tsvector;
UPDATE products SET products_ranking = to_tsvector("ProductName");