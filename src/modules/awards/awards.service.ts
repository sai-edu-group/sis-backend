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
}
