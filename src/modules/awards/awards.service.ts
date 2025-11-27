// CORE //
import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";

// DB Schema
import { Database } from "@/core/database/schema";

// ENUMS
import { LIMITS } from "@/common/enums/limits.enum";

@Injectable()
export class AwardsService {
  constructor(@Inject("DB") private readonly db: Kysely<Database>) {}

  /** Get the latest awards from the Database */
  async getLatestAwards() {
    return this.db
      .selectFrom("sis_awards")
      .select([
        "id",
        "awardname as awardName",
        "awarddesc as awardDesc",
        "thumbnailimg as thumbnailImg",
      ])
      .where("status", "=", 1)
      .orderBy("entrydate", "desc")
      .limit(LIMITS.latestAwards)
      .execute();
  }
}
