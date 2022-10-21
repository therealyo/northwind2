import type { Knex } from "knex";
import * as dotenv from "dotenv"

dotenv.config()
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: process.env.POSTGRES_HOST,
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      port: 5432,
      database: process.env.POSTGRES_DB,
      ssl: {
        rejectUnauthorized: true
      }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "northwind"
    },
    useNullAsDefault: true
  },
};

module.exports = config;
