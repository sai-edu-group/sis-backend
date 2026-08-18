// CORE //
import { Controller, Get, Query, BadRequestException } from "@nestjs/common";

// SERVICES //
import { StudentCouncilService } from "./student-council.service";

// UTILS //
import { resolveSchoolId } from "../../common/utils/school.util";

@Controller("student-council")
export class StudentCouncilController {
  constructor(private readonly service: StudentCouncilService) {}

  /**
   * GET Student Council Data
   * @param year - Academic year
   * @param schoolId - Optional school id; falls back to the default school
   * @returns Student Council entries for the provided year
   */
  @Get("by-year")
  async getByYear(
    @Query("year") year?: string,
    @Query("schoolId") schoolId?: string,
  ) {
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
    return this.service.getByYear(academicYear, resolveSchoolId(schoolId));
  }
}
