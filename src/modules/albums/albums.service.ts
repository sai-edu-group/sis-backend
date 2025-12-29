// ENUMS //
import { Tables } from "../../common/enums/database.enum";

// OTHERS //
import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { Kysely } from "kysely";

// DATA //
import { Database } from "../../core/database/schema";

@Injectable()
export class AlbumsService {
  constructor(@Inject("DB") private readonly db: Kysely<Database>) {}

  async getAlbumPhotos(albumId: number) {
    try {
      const album = await this.db
        .selectFrom("sis_web_gallery")
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

      return album;
    } catch (error) {
      throw error;
    }
  }
}