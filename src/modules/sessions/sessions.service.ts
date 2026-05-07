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

  async getSessions(scope: string) {
    switch (scope) {
      case "awards":
        return this.getAwardSessions();
      case "career-results":
        return this.getCareerResultSessions();
      case "results":
        return this.getResultSessions();
      default:
        throw new BadRequestException(`Unsupported scope '${scope}'.`);
    }
  }

  private async getAwardSessions() {
    try {
      return await this.db
        .selectFrom(`${Tables.AWARDS} as sa`)
        .innerJoin(`${Tables.SESSION} as ms`, (join) =>
          join.on(
            sql`CAST(sa.session_name AS CHAR)`,
            "=",
            sql`CAST(ms.id AS CHAR)`,
          ),
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

  private async getResultSessions() {
    try {
      return await this.db
        .selectFrom(`${Tables.CBSE_RESULTS} as r`)
        .innerJoin(`${Tables.SESSION} as ms`, (join) =>
          join.on(
            sql`CAST(r.session_name AS CHAR)`,
            "=",
            sql`CAST(ms.id AS CHAR)`,
          ),
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

  async getCareerResultSessions() {
    try {
      return await this.db
        .selectFrom(`${Tables.CAREER_RESULTS} as r`)
        .innerJoin(`${Tables.SESSION} as ms`, (join) =>
          join.on(
            sql`CAST(r.session_name AS CHAR)`,
            "=",
            sql`CAST(ms.id AS CHAR)`,
          ),
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
}
