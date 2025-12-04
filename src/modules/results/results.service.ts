// MODULES //
import { Kysely, sql } from "kysely";

// ENUMS //
import { Tables } from "@/common/enums/database.enum";

// OTHERS //
import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";

// DATA //
import { Database } from "@/core/database/schema";

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

    // Build full-year datetime range
    const start = new Date(year, 0, 1, 0, 0, 0, 0);
    const end = new Date(year, 11, 31, 23, 59, 59, 999);

    try {
      const rows = await this.db
        .selectFrom(`${Tables.CBSE_RESULTS} as r`)
        .leftJoin(`${Tables.CLASSES} as cl`, "cl.id", "r.class_name")
        .select([
          "r.studname as studentName",
          "r.studprofilepic as studentProfilePic",
          "r.percentage as percentage",
          sql<string>`COALESCE(cl.class_name, r.class_name)`.as("className"),
        ])
        .where("r.status", "=", 1)
        .where("r.class_name", "=", classId)
        .where("r.entrydate", ">=", start)
        .where("r.entrydate", "<=", end)
        .orderBy("r.entrydate", "desc")
        .execute();

      return rows;
    } catch (error) {
      throw new InternalServerErrorException("Unable to fetch results");
    }
  }
}
