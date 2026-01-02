// CORE //
import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";

// DB Schema //
import { Database } from "../../core/database/schema";

// ENUMS //
import { Tables } from "../../common/enums/database.enum";

@Injectable()
export class AlbumsService {
  // Service to handle album-related business logic
  constructor(@Inject("DB") private readonly db: Kysely<Database>) {}
  // Inject Kysely database instance for query building

  /**
   * Get albums by year. (Fetch albums filtered by created_on year)
   *
   * @param year - The year to filter albums by.
   */
  async getAlbumsByYear(year: number) {
    try {
      const startDate = new Date(`${year}-01-01T00:00:00`);
      const endDate = new Date(`${year}-12-31T23:59:59`);

      // Query albums matching the year range
      const albums = await this.db
        .selectFrom(Tables.GALLERY)
        // Select from sis_web_gallery table
        .select([
          "gallery_id as id",
          "gallery_title as title",
          "gallery_sub_title as sub_title",
          "gallery_thumbnail as thumbnail",
        ])
        .where("created_on", ">=", startDate)
        .where("created_on", "<=", endDate)
        // Sort by creation date in descending order (newest first)
        .orderBy("created_on", "desc")
        // Execute the Kysely query
        .execute();
      
      return albums;
      // Return the filtered album records
    } catch (error) {
      // Catch any database errors
      throw error;
    }
  }
}
