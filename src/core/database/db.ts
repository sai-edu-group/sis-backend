// PLUGINS //
import { Kysely, MysqlDialect } from "kysely";
import { createPool } from "mysql2";

// SCHEMA //
import { Database } from "@/core/database/schema";

const dialect = new MysqlDialect({
  pool: createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT || 3306),
    connectionLimit: 10,
  }),
});

export const db = new Kysely<Database>({ dialect });
