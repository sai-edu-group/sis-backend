// CORE //
import { Controller, Get } from "@nestjs/common";

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
}
