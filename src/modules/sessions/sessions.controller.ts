import { BadRequestException, Controller, Get, Query } from "@nestjs/common";

import { resolveSchoolId } from "../../common/utils/school.util";
import { SessionsService } from "./sessions.service";

@Controller("sessions")
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  /**
   * GET: /sessions?scope={scope}&schoolId={schoolId}
   *
   * Fetch sessions based on the provided scope. Supported scopes are:
   * - `awards`: Returns sessions that have associated awards.
   * - `career-results`: Returns sessions that have associated career results.
   * - `global-sioneers`: Returns sessions that have associated Global Sioneers entries.
   * - `results`: Returns sessions that have associated results.
   * - `student-council`: Returns sessions that have associated student council entries.
   *
   * If the scope is not provided or is unsupported, a BadRequestException is thrown.
   *
   * `schoolId` is optional and falls back to the default school.
   */
  @Get()
  getSessions(
    @Query("scope") scope?: string,
    @Query("schoolId") schoolId?: string,
  ) {
    if (!scope) {
      throw new BadRequestException("Query parameter 'scope' is required.");
    }

    return this.sessionsService.getSessions(scope, resolveSchoolId(schoolId));
  }
}
