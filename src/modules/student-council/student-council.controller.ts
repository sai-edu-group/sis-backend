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
   * @param session - Session name (e.g. 2025-2026)
   * @param schoolId - Optional school id; falls back to the default school
   * @returns Student Council entries for the provided session
   */
  @Get("by-session")
  async getBySession(
    @Query("session") session?: string,
    @Query("schoolId") schoolId?: string,
  ) {
    //  validate session presence
    if (!session?.trim()) {
      throw new BadRequestException("Query parameter 'session' is required.");
    }

    // fetch and return data
    return this.service.getBySession(session, resolveSchoolId(schoolId));
  }

  /**
   * GET Student Council Data by calendar year.
   *
   * Kept for backwards compatibility with clients that predate `by-session`.
   * New clients should use `by-session`.
   *
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
