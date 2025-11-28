// OTHERS //
import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";

// DATA //
import { Database } from "@/core/database/schema";

@Injectable()
export class PressReleasesService {
  constructor(@Inject("DB") private readonly db: Kysely<Database>) {}

  async getPressReleases(year: number, page: number) {
    const limit = 10;
    const offset = (page - 1) * limit;

    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    // Total Count
    const totalCountResult = await this.db
      .selectFrom("web_sis_pressrelease")
      .select(({ fn }) => fn.count<number>("id").as("count"))
      .where("status", "=", 1)
      .where("pressdate", ">=", startDate)
      .where("pressdate", "<=", endDate)
      .executeTakeFirst();

    const totalCount = totalCountResult?.count ?? 0;

    // Paginated data
    const pressReleases = await this.db
      .selectFrom("web_sis_pressrelease")
      .select([
        "id",
        "presstitle as title",
        "pressdate as date",
        "presslink as link",
        "pressthumbnail as thumbnail",
        "pressimage as image",
      ])
      .where("status", "=", 1)
      .where("pressdate", ">=", startDate)
      .where("pressdate", "<=", endDate)
      .orderBy("pressdate")
      .limit(limit)
      .offset(offset)
      .execute();

    return {
      totalCount,
      pressReleases,
    };
  }
}
