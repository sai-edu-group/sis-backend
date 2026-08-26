// ENUMS //
import { Tables } from "../../common/enums/database.enum";

// OTHERS //
import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Kysely, sql } from "kysely";

// DATA //
import { Database } from "../../core/database/schema";

@Injectable()
export class StudentCouncilService {
  constructor(@Inject("DB") private readonly db: Kysely<Database>) {}

  /**
   * Fetches every Student Council row as-is, with no filters applied and the
   * original database column names preserved.
   *
   * @returns Array of raw student council records
   */
  async getAll() {
    try {
      // Select every column of every row, without any conditions
      const rows = await this.db
        .selectFrom(Tables.STUDENT_COUNCIL)
        .selectAll()
        .execute();

      return rows;
    } catch (error) {
      // Wrap database failures in an Internal Server Error response
      throw new InternalServerErrorException({
        message: "Unable to fetch student council data",
        detail: error?.message ?? String(error),
      });
    }
  }

  /**
   * Fetches the Student Council entries for a specific academic session.
   * @param sessionName - The session name (e.g. 2025-2026)
   * @param schoolId - School the session belongs to
   * @returns Array of student council records
   */
  async getBySession(sessionName: string, schoolId: number) {
    try {
      // Query student council rows for the given academic session
      const rows = await this.db
        .selectFrom(`${Tables.STUDENT_COUNCIL} as sc`)
        .innerJoin(`${Tables.SESSION} as ms`, (join) =>
          join
            .on(
              sql`CAST(sc.session_name AS CHAR)`,
              "=",
              sql`CAST(ms.id AS CHAR)`
            )
            .on("ms.schoolid", "=", String(schoolId))
        )
        .select([
          "sc.id",
          "sc.admno as admissionNumber",
          "sc.studname as studentName",
          "sc.designation",
          "sc.class_name as className",
          "sc.studprofilepic as studentProfilePic",
        ])
        .where("sc.status", "=", 1)
        .where("ms.session_name", "=", sessionName.trim())
        .orderBy("sc.sorting")
        .execute();

      return rows;
    } catch (error) {
      // Wrap database failures in an Internal Server Error response
      throw new InternalServerErrorException({
        message: "Unable to fetch student council data",
        detail: error?.message ?? String(error),
      });
    }
  }

  /**
   * Fetches the Student Council entries for a specific academic year.
   *
   * Kept for backwards compatibility with clients that predate
   * {@link StudentCouncilService.getBySession}.
   *
   * @param academicYear - The academic year as a number (e.g. 2024)
   * @param schoolId - School the session belongs to
   * @returns Array of student council records
   */
  async getByYear(academicYear: number, schoolId: number) {
    try {
      // Query student council rows for the given academic year
      const rows = await this.db
        .selectFrom(`${Tables.STUDENT_COUNCIL} as sc`)
        .innerJoin(`${Tables.SESSION} as ms`, (join) =>
          join
            .on(
              sql`CAST(sc.session_name AS CHAR)`,
              "=",
              sql`CAST(ms.id AS CHAR)`
            )
            .on("ms.schoolid", "=", String(schoolId))
        )
        .select([
          "sc.id",
          "sc.admno as admissionNumber",
          "sc.studname as studentName",
          "sc.designation",
          "sc.class_name as className",
          "sc.studprofilepic as studentProfilePic",
        ])
        .where("sc.status", "=", 1)
        .where(sql<boolean>`YEAR(ms.session_enddate) = ${academicYear}`)
        .orderBy("sc.sorting")
        .execute();

      return rows;
    } catch (error) {
      // Wrap database failures in an Internal Server Error response
      throw new InternalServerErrorException({
        message: "Unable to fetch student council data",
        detail: error?.message ?? String(error),
      });
    }
  }
}
