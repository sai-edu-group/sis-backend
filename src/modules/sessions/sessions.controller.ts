import { BadRequestException, Controller, Get, Query } from "@nestjs/common";

import { SessionsService } from "./sessions.service";

@Controller("sessions")
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  /**
   * GET: /sessions?scope={scope}
   *
   * Fetch sessions based on the provided scope. Supported scopes are:
   * - `awards`: Returns sessions that have associated awards.
   * - `career-results`: Returns sessions that have associated career results.
   * - `results`: Returns sessions that have associated results.
   *
   * If the scope is not provided or is unsupported, a BadRequestException is thrown.
    */
  @Get()
  getSessions(@Query("scope") scope?: string) {
    if (!scope) {
      throw new BadRequestException("Query parameter 'scope' is required.");
    }

    return this.sessionsService.getSessions(scope);
  }
}
