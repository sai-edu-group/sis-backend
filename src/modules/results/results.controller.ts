// MODULES //
import { ResultsService } from "@/modules/results/results.service";

// OTHERS //
import { BadRequestException, Controller, Get, Query } from "@nestjs/common";

@Controller("results")
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  /**
   * GET /results/get-results
   * Query Parameters:
     - @param year
    - @param classId
   
   * Returns an array of result rows for the given year and class.
   * @throws BadRequestException for invalid/missing parameters
   */

  @Get("get-results")
  async getResults(@Query("year") year: string,@Query("classId") classId: string,) 
  {
    // Basic presence checks
    if (!year) 
    {
      throw new BadRequestException("Year query parameter is required");
    }
    if (!classId) 
    {
      throw new BadRequestException("classId query parameter is required");
    }

    // Parse and validate year
    const yearNumber = Number(year);
    if (!Number.isInteger(yearNumber) || isNaN(yearNumber)) 
    {
      throw new BadRequestException("Year must be a valid integer");
    }

    // Normalize classId (trim whitespace)
    const normalizedClassId = classId.trim();
    if (normalizedClassId.length === 0) 
    {
      throw new BadRequestException("classId cannot be empty");
    }

    // Delegate to service
    return this.resultsService.getResultsByYearAndClass(yearNumber, normalizedClassId);
  }
}
