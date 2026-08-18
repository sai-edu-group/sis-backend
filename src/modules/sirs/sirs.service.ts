// CORE //
import { Inject, Injectable, ServiceUnavailableException } from "@nestjs/common";

// PLUGINS //
import { Kysely, sql } from "kysely";

// SCHEMA //
import { Database } from "../../core/database/schema";

@Injectable()
export class SirsService {
  constructor(@Inject("DB") private readonly db: Kysely<Database>) {}

  async getHealth() {
    try {
      const result = await sql<{ databaseStatus: number }>`
        select 1 as databaseStatus
      `.execute(this.db);

      return {
        service: "sirs",
        database: {
          connected: result.rows[0]?.databaseStatus === 1,
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new ServiceUnavailableException("Database connection unavailable");
    }
  }
}
