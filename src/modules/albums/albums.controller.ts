// MODULES //
import { AlbumsService } from "../../modules/albums/albums.service";

// OTHERS //
import { Controller, Get, Query, BadRequestException } from "@nestjs/common";

@Controller("albums")
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  /**
   * GET: /albums/album-photos?album_id=3
   * Get album photos by album id
   */
  @Get("album-photos")
  getAlbumPhotos(@Query("album_id") albumId: string) {
    if (isNaN(Number(albumId))) {
      throw new BadRequestException("Invalid album_id");
    }

    return this.albumsService.getAlbumPhotos(Number(albumId));
  }
}
