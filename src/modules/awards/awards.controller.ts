// CORE //
import { Controller, Get, Query, BadRequestException } from "@nestjs/common";

// SERVICES //
import { AwardsService } from "../../modules/awards/awards.service";

// UTILS //
import { resolveSchoolId } from "../../common/utils/school.util";

@Controller("awards")
export class AwardsController {
  constructor(private readonly awardsService: AwardsService) {}

  /**
   * GET: /awards/get-latest
   * Returns the latest 6 awards sorted by entry date.
   *
   * `schoolId` is optional and falls back to the default school.
   */
  @Get("get-latest")
  getLatestAwards(@Query("schoolId") schoolId?: string) {
    return this.awardsService.getLatestAwards(resolveSchoolId(schoolId));
  }

  /**
   * GET: /awards/get-awards
   *
   * Fetch awards by session name. `year` is accepted temporarily as a fallback
   * to preserve compatibility with the current frontend until it is updated.
   *
   * `schoolId` is optional and falls back to the default school.
   */
  @Get("get-awards")
  getAwards(
    @Query("session") sessionName?: string,
    @Query("schoolId") schoolId?: string,
  ) {
    if (!sessionName) {
      throw new BadRequestException(
        "Query parameter 'sessionName' is required.",
      );
    }

    return this.awardsService.getAwards({
      sessionName,
      schoolId: resolveSchoolId(schoolId),
    });
  }
}
