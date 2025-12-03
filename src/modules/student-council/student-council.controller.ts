// CORE //
import { Controller, Get, Query, BadRequestException } from "@nestjs/common";

// SERVICES //
import { StudentCouncilService } from "@/modules/student-council/student-council.service";

@Controller("student-council")
export class StudentCouncilController {
  constructor(private readonly service: StudentCouncilService) {}

  /**
   * GET Student Council Data
   * @param year - Academic year
   * @returns Student Council entries for the provided year
   */
  @Get("by-year")
  async getByYear(@Query("year") year?: string) {
    //  validate year presence
    if (!year) {
      throw new BadRequestException("Year is required");
    }
    //  parse year to integer
    const academicYear = parseInt(year, 10);
    if (isNaN(academicYear)) {
      throw new BadRequestException("Year must be a number");
    }
    // fetch and return data
    return this.service.getByYear(academicYear);
  }
}
