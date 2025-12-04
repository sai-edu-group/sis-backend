// ENUMS //
import { Limits } from "@/common/enums/limits.enum";
import { Tables } from "@/common/enums/database.enum";

// OTHERS //
import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";

// DATA //
import { Database } from "@/core/database/schema";

@Injectable()
export class PressReleasesService {
  constructor(@Inject("DB") private readonly db: Kysely<Database>) {}

  /**
   * Get paginated press releases filtered by year.
   * @param year
   * @param page
   */
  async getPressReleases(year: number, page: number) {
  const limit = Limits.PRESS_RELEASE;
  const offset = (page - 1) * limit;

  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${year}-12-31`);

  try {
    // Total Count
    const totalCountResult = await this.db
      .selectFrom(Tables.PRESS_RELEASES)
      .select(({ fn }) => fn.count<number>("id").as("count"))
      .where("status", "=", 1)
      .where("pressdate", ">=", startDate)
      .where("pressdate", "<=", endDate)
      .executeTakeFirst();

    const totalCount = totalCountResult?.count ?? 0;

    // Paginated data
    const pressReleases = await this.db
      .selectFrom(Tables.PRESS_RELEASES)
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
  } catch (error) {
    throw error;
  }
}

}
