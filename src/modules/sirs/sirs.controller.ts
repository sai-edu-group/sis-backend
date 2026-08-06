// CORE //
import { Controller, Get } from "@nestjs/common";

// SERVICES //
import { SirsService } from "./sirs.service";

@Controller("sirs")
export class SirsController {
  constructor(private readonly sirsService: SirsService) {}

  /**
   * GET: /sirs/health
   */
  @Get("health")
  getHealth() {
    return this.sirsService.getHealth();
  }
}
