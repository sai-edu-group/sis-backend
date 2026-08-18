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
   * Fetch sioneers data for a given session name.
   *
   * @param sessionName
   * @param schoolId - School the session belongs to
   * @throws InternalServerErrorException
   */
  async getSioneersBySession(sessionName: string, schoolId: number) {
    try {
      const row = await this.db
        .selectFrom(`${Tables.GLOBAL_SAIONEERS} as s`)
        .innerJoin(`${Tables.SESSION} as ms`, (join) =>
          join
            .on(
              sql`CAST(s.session_name AS CHAR)`,
              "=",
              sql`CAST(ms.id AS CHAR)`,
            )
            .on("ms.schoolid", "=", String(schoolId)),
        )
        .select([
          "s.id",
          "s.admno as admissionNumber",
          "s.studname as studentName",
          "s.univname as universityName",
          "s.studprofilepic as profilePicture",
          "s.countryname as countryName",
        ])
        .where("s.status", "=", 1)
        .where("ms.session_name", "=", sessionName.trim())
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
