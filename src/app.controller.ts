// CORE //
import { Controller, Get } from "@nestjs/common";

// SERVICES //
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * GET: "/"
   * @returns
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
