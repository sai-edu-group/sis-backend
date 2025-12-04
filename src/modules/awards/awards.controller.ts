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
   * Fetch awards by a given year.
   *
   * @param year - Query parameter specifying the year.
   * @throws BadRequestException - If year is missing or not numeric.
   */
  @Get("get-awards")
  getAwardsByYear(@Query("year") year: string) {
    // --- Validation ---
    if (!year) {
      throw new BadRequestException("Query parameter 'year' is required.");
    }

    // Convert the 'year' query parameter from a string to a number
    const numericYear = Number(year);

    // Validation block for checking input year
    if (isNaN(numericYear)) {
      throw new BadRequestException("Year must be a valid number.");
    }

    return this.awardsService.getAwardsByYear(numericYear);
  }
}
