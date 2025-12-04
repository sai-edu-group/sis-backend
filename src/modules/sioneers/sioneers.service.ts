// OTHERS //
import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Kysely } from "kysely";

// DATA //
import { Database } from "@/core/database/schema";
import { Tables } from "@/common/enums/database.enum";

@Injectable()
export class SioneersService {
  constructor(@Inject("DB") private readonly db: Kysely<Database>) {}

  /**
   * Fetch sioneers data for a given academic year
   *
   * @param year
   * @throws InternalServerErrorException
   */
  async getSioneersByYear(year: number) {

    // Define start and end dates for the academic year
    const start = new Date(year, 0, 1, 0, 0, 0, 0);
    const end = new Date(year, 11, 31, 23, 59, 59, 999);
    
    
    // Query to the database where display sioneers within the date range also status is active (1)
    try {
      const row = await this.db
        .selectFrom(Tables.GLOBAL_SAIONEERS)
        .select([
          "id",
          "admno as admissionNumber",
          "univname as universityName",
          "class_name as className",
          "studprofilepic as profilePicture",
          "countryname as countryName",
        ])
        .where("status", "=", 1)
        .where("entrydate", ">=", start)
        .where("entrydate", "<=", end)
        .orderBy("id")
        .execute();
      return row;
    } catch (error) {
      // Error handling for database query
      throw new InternalServerErrorException({
        message: "Unable to fetch sioneers data",
        detail: error?.message ?? String(error),
      });
    }
  }
}
