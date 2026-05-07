import { BadRequestException, Controller, Get, Query } from "@nestjs/common";

import { SessionsService } from "./sessions.service";

@Controller("sessions")
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  getSessions(@Query("scope") scope?: string) {
    if (!scope) {
      throw new BadRequestException("Query parameter 'scope' is required.");
    }

    return this.sessionsService.getSessions(scope);
  }
}
