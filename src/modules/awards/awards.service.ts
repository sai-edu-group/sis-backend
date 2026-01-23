// CORE //
import { Inject, Injectable } from "@nestjs/common";
import { Kysely, sql } from "kysely";

// DB Schema //
import { Database } from "../../core/database/schema";

// ENUMS //
import { Limits } from "../../common/enums/limits.enum";
import { Tables } from "../../common/enums/database.enum";

@Injectable()
export class AwardsService {
  constructor(@Inject("DB") private readonly db: Kysely<Database>) {}

  /**
   * Get the latest awards from the database.
   */
  async getLatestAwards() {
    return this.db
      .selectFrom(Tables.AWARDS)
      .select([
        "id",
        "awardname as awardName",
        "awarddesc as awardDesc",
        "thumbnailimg as thumbnailImg",
      ])
      .where("status", "=", 1)
      .orderBy("entrydate", "desc")
      .limit(Limits.LATEST_AWARDS)
      .execute();
  }

  /**
   * Get awards by year.
   *
   * @param year - The year to filter awards by (e.g., "2025").
   */
  // Retrieve active awards for a specific year using sis_web_year, sorted by newest first
  async getAwardsByYear(year: string) {
    try {
      // Query awards matching the year and active status by joining with master_session
      return this.db
        .selectFrom(`${Tables.AWARDS} as sa`)
        // using sql cast for join to handle potential type mismatch (string session_name vs int id)
        .innerJoin("master_session as ms", (join) =>
          join.on(
            sql`CAST(sa.session_name AS CHAR)`,
            "=",
            sql`CAST(ms.id AS CHAR)`
          )
        )
        .select([
          "sa.id",
          "sa.awardname as awardName",
          "sa.awarddesc as awardDesc",
          "sa.thumbnailimg as thumbnailImg",
        ])
        .where("sa.status", "=", 1)
        // match first 4 chars of master_session.session_name (start year) with requested year
        .where(sql<boolean>`SUBSTRING(ms.session_name, 1, 4) = ${year}`)
        .orderBy("sa.entrydate", "desc")
        .execute();
    } catch (error) {
      throw error;
    }
  }
}
