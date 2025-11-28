// CORE //
import { Controller, Get, Query } from "@nestjs/common";

// SERVICES //
import { AwardsService } from "@/modules/awards/awards.service";

@Controller("awards")
export class AwardsController {
  constructor(private readonly awardsService: AwardsService) {}

  /**
   * GET: /awards/get-latest
   * Get latest 6 awards by entrydate
   */
  @Get("get-latest")
  getLatestAwards() {
    return this.awardsService.getLatestAwards();
  }

  @Get("get-awards")
  getAwardsByYear(@Query("year") year: string) {
    return this.awardsService.getAwardsByYear(Number(year));
  }
}
