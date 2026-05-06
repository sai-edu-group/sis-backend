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
        sql<number>`YEAR(awardrecdate)`.as("year"),
      ])
      .where("status", "=", 1)
      .orderBy("awardrecdate", "desc")
      .limit(Limits.LATEST_AWARDS)
      .execute();
  }

  /**
   * Get distinct award sessions sorted from latest to oldest.
   */
  async getAwardSessions() {
    return this.db
      .selectFrom(`${Tables.AWARDS} as sa`)
      .innerJoin(`${Tables.SESSION} as ms`, (join) =>
        join.on(sql`CAST(sa.session_name AS CHAR)`, "=", sql`CAST(ms.id AS CHAR)`),
      )
      .select([
        "ms.id as sessionId",
        "ms.session_name as sessionName",
        "ms.session_enddate as sessionEndDate",
      ])
      .where("sa.status", "=", 1)
      .where("ms.status", "=", 1)
      .where("ms.session_name", "is not", null)
      .distinct()
      .orderBy("ms.session_enddate", "desc")
      .execute();
  }

  /**
   * Get awards by session name.
   *
   * `year` is kept as a fallback so the existing frontend does not break
   * while the client switches to sending `sessionName`.
   */
  async getAwards(filters: { sessionName?: string; year?: number }) {
    const { sessionName, year } = filters;

    try {
      let query = this.db
        .selectFrom(`${Tables.AWARDS} as sa`)
        .innerJoin(`${Tables.SESSION} as ms`, (join) =>
          join.on(sql`CAST(sa.session_name AS CHAR)`, "=", sql`CAST(ms.id AS CHAR)`),
        )
        .select([
          "sa.id",
          "sa.awardname as awardName",
          "sa.awarddesc as awardDesc",
          "sa.thumbnailimg as thumbnailImg",
          "ms.session_name as sessionName",
        ])
        .where("sa.status", "=", 1)
        .where("ms.status", "=", 1);

      if (sessionName) {
        query = query.where("ms.session_name", "=", sessionName);
      } else if (typeof year === "number") {
        query = query.where(sql<boolean>`YEAR(ms.session_enddate) = ${year}`);
      }

      return query.orderBy("sa.entrydate", "desc").execute();
    } catch (error) {
      throw error;
    }
  }
}
