// MODULES //
import { Kysely, sql } from "kysely";

// ENUMS //
import { Tables } from "../../common/enums/database.enum";

// OTHERS //
import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";

// DATA //
import { Database } from "../../core/database/schema";

@Injectable()
export class ResultsService {
  constructor(@Inject("DB") private readonly db: Kysely<Database>) {}

  /**
   * Fetches Student Results for a given academic year and Class.
   *
   * @param year - Academic year (e.g., 2025)
   * @param classId - Class identifier (e.g., "7", "10A")
   * @returns Array of Result records containing studentName, studentProfilePic, percentage, and className.
   *
   * @throws InternalServerErrorException If the year is invalid or the query fails.
   */
  async getResultsByYearAndClass(year: number, classId: string) {
    if (!Number.isInteger(year)) {
      throw new InternalServerErrorException("Invalid year");
    }

    try {
      const rows = await this.db
        .selectFrom(`${Tables.CBSE_RESULTS} as r`)
        .leftJoin(`${Tables.CLASSES} as cl`, "cl.id", "r.class_name")
        .innerJoin(`${Tables.SESSION} as ms`, (join) =>
          join.on(
            sql`CAST(r.session_name AS CHAR)`,
            "=",
            sql`CAST(ms.id AS CHAR)`
          )
        )
        .select([
          "r.studname as studentName",
          "r.studprofilepic as studentProfilePic",
          "r.percentage as percentage",
          sql<string>`COALESCE(cl.class_name, r.class_name)`.as("className"),
        ])
        .where("r.status", "=", 1)
        .where("r.class_name", "=", classId)
        .where(sql<boolean>`YEAR(ms.session_enddate) = ${year}`)
        .orderBy("r.percentage", "desc")
        .execute();

      return rows;
    } catch (error) {
      throw new InternalServerErrorException("Unable to fetch results");
    }
  }
}
