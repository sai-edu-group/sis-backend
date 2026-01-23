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
   * Fetches the Student Council entries for a specific academic year.
   * @param academicYear - The academic year as a number (e.g. 2024)
   * @returns Array of student council records
   */
  async getByYear(academicYear: number) {
    try {
      // Query student council rows for the given academic year
      const rows = await this.db
        .selectFrom(`${Tables.STUDENT_COUNCIL} as sc`)
        .innerJoin(`${Tables.SESSION} as ms`, (join) =>
          join.on(
            sql`CAST(sc.session_name AS CHAR)`,
            "=",
            sql`CAST(ms.id AS CHAR)`
          )
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
