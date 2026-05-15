import { Module } from "@nestjs/common";

import { DatabaseModule } from "../../core/database/database.module";

import { CareerResultsController } from "./career-results.controller";
import { CareerResultsService } from "./career-results.service";

@Module({
  imports: [DatabaseModule],
  controllers: [CareerResultsController],
  providers: [CareerResultsService],
})
export class CareerResultsModule {}
