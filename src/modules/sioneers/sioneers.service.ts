// OTHERS //
import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Kysely, sql } from "kysely";

// DATA //
import { Database } from "../../core/database/schema";
import { Tables } from "../../common/enums/database.enum";

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
    // Query to the database where display sioneers within the date range also status is active (1)
    try {
      const row = await this.db
        .selectFrom(`${Tables.GLOBAL_SAIONEERS} as s`)
        .innerJoin(`${Tables.SESSION} as ms`, (join) =>
          join.on(
            sql`CAST(s.session_name AS CHAR)`,
            "=",
            sql`CAST(ms.id AS CHAR)`
          )
        )
        .select([
          "s.id",
          "s.admno as admissionNumber",
          "s.univname as universityName",
          "s.studprofilepic as profilePicture",
          "s.countryname as countryName",
        ])
        .where("s.status", "=", 1)
        .where(sql<boolean>`YEAR(ms.session_enddate) = ${year}`)
        .orderBy("s.id")
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
