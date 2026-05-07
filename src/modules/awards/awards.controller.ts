// CORE //
import { Controller, Get, Query, BadRequestException } from "@nestjs/common";

// SERVICES //
import { AwardsService } from "../../modules/awards/awards.service";

@Controller("awards")
export class AwardsController {
  constructor(private readonly awardsService: AwardsService) {}

  /**
   * GET: /awards/get-latest
   * Returns the latest 6 awards sorted by entry date.
   */
  @Get("get-latest")
  getLatestAwards() {
    return this.awardsService.getLatestAwards();
  }

  /**
   * GET: /awards/get-awards
   *
   * Fetch awards by session name. `year` is accepted temporarily as a fallback
   * to preserve compatibility with the current frontend until it is updated.
   */
  @Get("get-awards")
  getAwards(
    @Query("session") sessionName?: string,
  ) {
    if (!sessionName) {
      throw new BadRequestException(
        "Query parameter 'sessionName' is required.",
      );
    }

    if (sessionName) {
      return this.awardsService.getAwards({ sessionName });
    }
  }
}
