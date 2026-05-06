import { BadRequestException, Controller, Get, Param, Query } from "@nestjs/common";

import { CareerResultsService } from "./career-results.service";

@Controller("career-results")
export class CareerResultsController {
  constructor(private readonly careerResultsService: CareerResultsService) {}

  @Get("get-sessions")
  async getCareerResultSessions() {
    return this.careerResultsService.getCareerResultSessions();
  }

  @Get("exams")
  async getCareerResultsList() {
    return this.careerResultsService.getCareerResultsList();
  }

  @Get(":examSlug")
  async getCareerResultsDetail(
    @Param("examSlug") examSlug: string,
    @Query("session") session?: string,
  ) {
    if (!session?.trim()) {
      throw new BadRequestException("Query parameter 'session' is required.");
    }

    return this.careerResultsService.getCareerResultsDetail(examSlug, session);
  }
}
