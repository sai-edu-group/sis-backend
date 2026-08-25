import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { Kysely, sql } from "kysely";

import { Tables } from "../../common/enums/database.enum";
import { Database } from "../../core/database/schema";

@Injectable()
export class SessionsService {
  constructor(@Inject("DB") private readonly db: Kysely<Database>) {}

  async getSessions(scope: string, schoolId: number) {
    switch (scope) {
      case "awards":
        return this.getAwardSessions(schoolId);
      case "career-results":
        return this.getCareerResultSessions(schoolId);
      case "global-sioneers":
        return this.getGlobalSioneersSessions(schoolId);
      case "results":
        return this.getResultSessions(schoolId);
      case "student-council":
        return this.getStudentCouncilSessions(schoolId);
      default:
        throw new BadRequestException(`Unsupported scope '${scope}'.`);
    }
  }

  /**
   * Fetches every row from the session master table as-is, with no filters
   * applied (no status, school or content-type conditions).
   *
   * @returns Array of raw session records
   */
  async getAllSessions() {
    try {
      return await this.db.selectFrom(Tables.SESSION).selectAll().execute();
    } catch (error) {
      throw new InternalServerErrorException("Unable to fetch sessions");
    }
  }

  private async getAwardSessions(schoolId: number) {
    try {
      return await this.db
        .selectFrom(`${Tables.AWARDS} as sa`)
        .innerJoin(`${Tables.SESSION} as ms`, (join) =>
          join
            .on(
              sql`CAST(sa.session_name AS CHAR)`,
              "=",
              sql`CAST(ms.id AS CHAR)`,
            )
            .on("ms.schoolid", "=", String(schoolId)),
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
    } catch (error) {
      throw new InternalServerErrorException("Unable to fetch sessions");
    }
  }

  private async getResultSessions(schoolId: number) {
    try {
      return await this.db
        .selectFrom(`${Tables.CBSE_RESULTS} as r`)
        .innerJoin(`${Tables.SESSION} as ms`, (join) =>
          join
            .on(
              sql`CAST(r.session_name AS CHAR)`,
              "=",
              sql`CAST(ms.id AS CHAR)`,
            )
            .on("ms.schoolid", "=", String(schoolId)),
        )
        .select([
          "ms.id as sessionId",
          "ms.session_name as sessionName",
          "ms.session_enddate as sessionEndDate",
        ])
        .where("r.status", "=", 1)
        .where("ms.status", "=", 1)
        .where("ms.session_name", "is not", null)
        .distinct()
        .orderBy("ms.session_enddate", "desc")
        .execute();
    } catch (error) {
      throw new InternalServerErrorException("Unable to fetch sessions");
    }
  }

  async getCareerResultSessions(schoolId: number) {
    try {
      return await this.db
        .selectFrom(`${Tables.CAREER_RESULTS} as r`)
        .innerJoin(`${Tables.SESSION} as ms`, (join) =>
          join
            .on(
              sql`CAST(r.session_name AS CHAR)`,
              "=",
              sql`CAST(ms.id AS CHAR)`,
            )
            .on("ms.schoolid", "=", String(schoolId)),
        )
        .select([
          "ms.id as sessionId",
          "ms.session_name as sessionName",
          "ms.session_enddate as sessionEndDate",
        ])
        .where("r.status", "=", 1)
        .where("ms.status", "=", 1)
        .where("ms.session_name", "is not", null)
        .distinct()
        .orderBy("ms.session_enddate", "desc")
        .execute();
    } catch (error) {
      throw new InternalServerErrorException("Unable to fetch sessions");
    }
  }

  private async getStudentCouncilSessions(schoolId: number) {
    try {
      return await this.db
        .selectFrom(`${Tables.STUDENT_COUNCIL} as sc`)
        .innerJoin(`${Tables.SESSION} as ms`, (join) =>
          join
            .on(
              sql`CAST(sc.session_name AS CHAR)`,
              "=",
              sql`CAST(ms.id AS CHAR)`,
            )
            .on("ms.schoolid", "=", String(schoolId)),
        )
        .select([
          "ms.id as sessionId",
          "ms.session_name as sessionName",
          "ms.session_enddate as sessionEndDate",
        ])
        .where("sc.status", "=", 1)
        .where("ms.status", "=", 1)
        .where("ms.session_name", "is not", null)
        .distinct()
        .orderBy("ms.session_enddate", "desc")
        .execute();
    } catch (error) {
      throw new InternalServerErrorException("Unable to fetch sessions");
    }
  }

  private async getGlobalSioneersSessions(schoolId: number) {
    try {
      return await this.db
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
          "ms.id as sessionId",
          "ms.session_name as sessionName",
          "ms.session_enddate as sessionEndDate",
        ])
        .where("s.status", "=", 1)
        .where("ms.status", "=", 1)
        .where("ms.session_name", "is not", null)
        .distinct()
        .orderBy("ms.session_enddate", "desc")
        .execute();
    } catch (error) {
      throw new InternalServerErrorException("Unable to fetch sessions");
    }
  }
}
