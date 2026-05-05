import { BadRequestException, Controller, Get, Query } from "@nestjs/common";

import { CareerResultsService } from "./career-results.service";

@Controller("career-results")
export class CareerResultsController {
  constructor(private readonly careerResultsService: CareerResultsService) {}

  @Get()
  async getCareerResults(@Query("exam") exam?: string, @Query("year") year?: string) {
    const normalizedExam = exam?.trim();

    if (year && !normalizedExam) {
      throw new BadRequestException("exam query parameter is required when year is provided");
    }

    let yearNumber: number | undefined;

    if (year) {
      yearNumber = Number(year);

      if (!Number.isInteger(yearNumber) || isNaN(yearNumber)) {
        throw new BadRequestException("year must be a valid integer");
      }
    }

    if (!normalizedExam) {
      return this.careerResultsService.getCareerResultsList();
    }

    return this.careerResultsService.getCareerResultsDetail(normalizedExam, yearNumber);
  }
}
