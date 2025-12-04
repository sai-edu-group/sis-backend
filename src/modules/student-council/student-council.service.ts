// CORE
import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Kysely } from "kysely";
import { Database } from "@/core/database/schema";
import { Tables } from "@/common/enums/database.enum";

@Injectable()
export class StudentCouncilService {
  constructor(@Inject("DB") private readonly db: Kysely<Database>) {}

  /**
   * Fetches the Student Council entries for a specific academic year.
   * @param academicYear - The academic year as a number (e.g. 2024)
   * @returns Array of student council records
   */
  async getByYear(academicYear: number) {
    // Construct date range for given year
    const startOfYear = new Date(academicYear, 0, 1, 0, 0, 0, 0);
    const endOfYear = new Date(academicYear, 11, 31, 23, 59, 59, 999);

    try {
      // Query student council rows for the given academic year
      const rows = await this.db
        .selectFrom(Tables.STUDENT_COUNCIL)
        .select([
          "id",
          "admno as admissionNumber",
          "studname as studentName",
          "designation",
          "class_name as className",
          "studprofilepic as studentProfilePic",
        ])
        .where("status", "=", 1)
        .where("entrydate", ">=", startOfYear)
        .where("entrydate", "<=", endOfYear)
        .orderBy("sorting")
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
