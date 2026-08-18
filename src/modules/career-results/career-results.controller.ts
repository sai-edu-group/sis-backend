import { BadRequestException, Controller, Get, Param, Query } from "@nestjs/common";

import { CareerResultsService } from "./career-results.service";

// UTILS //
import { resolveSchoolId } from "../../common/utils/school.util";

@Controller("career-results")
export class CareerResultsController {
  constructor(private readonly careerResultsService: CareerResultsService) {}

  /**
   * GET: /career-results/exams
   *
   * `schoolId` is optional and falls back to the default school.
   */
  @Get("exams")
  async getCareerResultsList(@Query("schoolId") schoolId?: string) {
    return this.careerResultsService.getCareerResultsList(
      resolveSchoolId(schoolId),
    );
  }

  /**
   * GET: /career-results/{examSlug}
   *
   * `schoolId` is optional and falls back to the default school.
   */
  @Get(":examSlug")
  async getCareerResultsDetail(
    @Param("examSlug") examSlug: string,
    @Query("session") session?: string,
    @Query("schoolId") schoolId?: string,
  ) {
    if (!session?.trim()) {
      throw new BadRequestException("Query parameter 'session' is required.");
    }

    return this.careerResultsService.getCareerResultsDetail(
      examSlug,
      session,
      resolveSchoolId(schoolId),
    );
  }
}
