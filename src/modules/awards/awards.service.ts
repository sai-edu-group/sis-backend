// CORE //
import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";

// DB Schema
import { Database } from "@/core/database/schema";

// ENUMS
import { Limits } from "@/common/enums/limits.enum";
import { Tables } from "@/common/enums/database.enum";

@Injectable()
export class AwardsService {
  constructor(@Inject("DB") private readonly db: Kysely<Database>) {}

  /** Get the latest awards from the Database */
  async getLatestAwards() {
    return this.db
      .selectFrom(Tables.AWARDS)
      .select([
        "id",
        "awardname as awardName",
        "awarddesc as awardDesc",
        "thumbnailimg as thumbnailImg",
      ])
      .where("status", "=", 1)
      .orderBy("entrydate", "desc")
      .limit(Limits.LATEST_AWARDS)
      .execute();
  }

  async getAwardsByYear(year: number) {
  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${year}-12-31`);

  return this.db
    .selectFrom("sis_awards")
    .select([
      "id",
      "awardname as awardName",
      "awarddesc as awardDesc",
      "thumbnailimg as thumbnailImg",
    ])
    .where("status", "=", 1)
    .where("entrydate", ">=", startDate)
    .where("entrydate", "<=", endDate)
    .orderBy("entrydate", "desc")
    .execute();
  }

}
