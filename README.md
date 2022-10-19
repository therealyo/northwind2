## Comparison to drizzle-orm (old):
    - Don't like usage of decorators in typeorm. Class variables are more readable imho. If you have to add a lot of different properties to typeorm column decorator stack can grow quite big.
    - Requirment of third party import (reflect-metadata) is not good feature also.
    - typeorm uses entity manager to communicate with tables in database. drizzle can create instances of the tables and operate with them
    - typeorm supports mongo-like syntax for queries and also implements query builder. Thus typeorm supports both no-sql and sql databases. drizzle is pure query builder orm
    - typeorm supports more flexible queries creation with query builder