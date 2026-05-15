// PLUGINS //
import { Kysely, MysqlDialect } from "kysely";
import { createPool } from "mysql2";

// SCHEMA //
import { Database } from "./schema";

console.log("DATABASE SE CONNECT HO");

console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);
console.log(process.env.DB_NAME);
console.log(process.env.DB_PORT);

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
