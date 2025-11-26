// CORE //
import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";

// DB Schema
import { Database } from "@/core/database/schema";

@Injectable()
export class AwardsService {
  constructor(@Inject("DB") private readonly db: Kysely<Database>) {}

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
      .limit(6)
      .execute();
  }
}
