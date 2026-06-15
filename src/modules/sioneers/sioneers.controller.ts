// MODULES //
import { SioneersService } from "./sioneers.service";

// OTHERS //
import { BadRequestException, Controller, Get, Query } from "@nestjs/common";

@Controller("sioneers")
export class SioneersController {
  constructor(private readonly sioneersService: SioneersService) {}

  /**
   * Fetches sioneers (students) for a given session name.
   *
   * @param session - Session name (e.g. 2025-2026)
   * @returns List of sioneers for that session
   */
  @Get("get-sioneers")
  async getSioneers(@Query("session") session?: string) {
    if (!session?.trim()) {
      throw new BadRequestException("Query parameter 'session' is required.");
    }

    return this.sioneersService.getSioneersBySession(session);
  }
}
