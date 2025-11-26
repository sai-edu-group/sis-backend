import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Kysely, MysqlDialect } from "kysely";
import { createPool } from "mysql2";
import { Database } from "@/core/database/schema";

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: "DB",
      useFactory: (configService: ConfigService) => {
        const dialect = new MysqlDialect({
          pool: createPool({
            host: configService.get<string>("DB_HOST"),
            user: configService.get<string>("DB_USER"),
            password: configService.get<string>("DB_PASSWORD"),
            database: configService.get<string>("DB_NAME"),
            port: configService.get<number>("DB_PORT", 3306),
            connectionLimit: 10,
          }),
        });

        return new Kysely<Database>({ dialect });
      },
      inject: [ConfigService],
    },
  ],
  exports: ["DB"],
})
export class DatabaseModule {}
