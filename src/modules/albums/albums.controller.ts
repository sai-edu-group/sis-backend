// CORE //
import { Controller, Get, Query, BadRequestException } from "@nestjs/common";

// SERVICES //
import { AlbumsService } from "./albums.service";

@Controller("albums")
export class AlbumsController {
  // Albums controller to handle HTTP requests
  constructor(private readonly albumsService: AlbumsService) {}
  // Inject AlbumsService for handling album operations

  /**
   * GET: /albums/get-albums
   *
   * Fetch albums by a given year.
   *
   * @param year - Query parameter specifying the year.
   * @throws BadRequestException - If year is missing or not numeric.
   */
  @Get("get-albums")
  getAlbumsByYear(@Query("year") year: string) {
    // Fetch albums filtered by year from query parameter
    // --- Validation ---
    if (!year) {
      throw new BadRequestException("Query parameter 'year' is required.");
    }
    
    // Validate that year query parameter is provided
    const numericYear = Number(year);

    // Validation block for checking input year
    if (isNaN(numericYear)) {
      throw new BadRequestException("Year must be a valid number.");
    }

    // Call service method to fetch albums for the given year
    return this.albumsService.getAlbumsByYear(numericYear);
  }
}
