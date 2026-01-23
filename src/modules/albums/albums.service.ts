// CORE //
import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { Kysely, sql } from "kysely";

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
    async getAlbumsByYear(year: string) {
    try {
      // Query albums matching the year range
      // The gallery_year column refers to sis_web_year (e.g. id=1 -> "2025")
      const albums = await this.db
        .selectFrom(`${Tables.GALLERY} as sg`)
        .innerJoin(`${Tables.YEAR} as sy`, "sg.gallery_year", "sy.year_id")
        .select([
          "sg.gallery_id as id",
          "sg.gallery_title as title",
          "sg.gallery_sub_title as sub_title",
          "sg.gallery_thumbnail as thumbnail",
          "sg.gallery_photo_path as photo_path",
        ])
        .where("sy.year_title", "=", year)
        // Sort by creation date in descending order (newest first)
        .orderBy("sg.created_on", "desc")
        // Execute the Kysely query
        .execute();
      
      return albums;
      // Return the filtered album records
    } catch (error) {
      // Catch any database errors
      throw error;
    }
  }

  /**
   * Get album photos by album ID.
   *
   * @param albumId - The ID of the album to fetch photos from.
   */
  async getAlbumPhotos(albumId: number) {
    try {
      const album = await this.db
        .selectFrom(Tables.GALLERY)
        .select([
          "gallery_id as id",
          "gallery_title as title",
          "gallery_sub_title as sub_title",
          "gallery_thumbnail as thumbnail",
          "gallery_photo_path as photo_path",
          "gallery_photo",
        ])
        .where("gallery_id", "=", albumId)
        .executeTakeFirst();

      if (!album) {
        throw new BadRequestException("Album not found");
      }

      // Return the album with its photos
      return album;
    } catch (error) {
      // Catch any database errors
      throw error;
    }
  }
}
