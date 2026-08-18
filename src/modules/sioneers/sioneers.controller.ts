// MODULES //
import { SioneersService } from "./sioneers.service";

// UTILS //
import { resolveSchoolId } from "../../common/utils/school.util";

// OTHERS //
import { BadRequestException, Controller, Get, Query } from "@nestjs/common";

@Controller("sioneers")
export class SioneersController {
  constructor(private readonly sioneersService: SioneersService) {}

  /**
   * Fetches sioneers (students) for a given session name.
   *
   * @param session - Session name (e.g. 2025-2026)
   * @param schoolId - Optional school id; falls back to the default school
   * @returns List of sioneers for that session
   */
  @Get("get-sioneers")
  async getSioneers(
    @Query("session") session?: string,
    @Query("schoolId") schoolId?: string,
  ) {
    if (!session?.trim()) {
      throw new BadRequestException("Query parameter 'session' is required.");
    }

    return this.sioneersService.getSioneersBySession(
      session,
      resolveSchoolId(schoolId),
    );
  }
}
