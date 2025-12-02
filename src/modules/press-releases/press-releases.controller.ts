// MODULES //
import { PressReleasesService } from "@/modules/press-releases/press-releases.service";

// OTHERS //
import { Controller, Get, Query, BadRequestException } from "@nestjs/common";

@Controller("press-releases")
export class PressReleasesController {
  constructor(private readonly pressReleasesService: PressReleasesService) {}

  /**
   * GET: /press-releases/get-press-releases?year=2024&page=2
   * Paginated Press Releases with year filter
   */
  @Get("get-press-releases")
  getPressReleases(
    @Query("year") year: string,
    @Query("page") page = "1"
  ) {
    
    if (isNaN(Number(year))) {
      throw new BadRequestException("Invalid year");
    }
    return this.pressReleasesService.getPressReleases(Number(year), Number(page));
  }
}
