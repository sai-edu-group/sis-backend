import { Controller, Get, Param } from "@nestjs/common";

import { CareerResultsService } from "./career-results.service";

@Controller("career-results")
export class CareerResultsController {
  constructor(private readonly careerResultsService: CareerResultsService) {}

  @Get("exams")
  async getCareerResultsList() {
    return this.careerResultsService.getCareerResultsList();
  }

  @Get(":examSlug")
  async getCareerResultsDetail(@Param("examSlug") examSlug: string) {
    return this.careerResultsService.getCareerResultsDetail(examSlug);
  }
}
