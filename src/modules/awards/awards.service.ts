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
      // Query awards matching the year and active status by mapping
      return this.db
        .selectFrom(Tables.AWARDS)
        // @ts-ignore
        .innerJoin("master_session", "sis_awards.session_name", "master_session.id")
        // @ts-ignore - join with non-schema table; runtime SQL is valid
        .select([
          "id",
          "awardname as awardName",
          "awarddesc as awardDesc",
          "thumbnailimg as thumbnailImg",
        ])
        .where("status", "=", 1)
        // match first 4 chars of master_session.session_name (start year) with requested year
        // @ts-ignore
        .where(sql`SUBSTRING(master_session.session_name, 1, 4) = ${year}`)
        .orderBy("entrydate", "desc")
        .execute();
    } catch (error) {
      throw error;
    }
  }
}
