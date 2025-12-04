// CORE //
import { Module } from "@nestjs/common";

// SERVICES //
import { ResultsService } from "./results.service";

// MODULES //
import { DatabaseModule } from "../../core/database/database.module";

// CONTROLLERS //
import { ResultsController } from "./results.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
