import { Module } from "@nestjs/common";

// CONTROLLERS //
import { AwardsController } from "../../modules/awards/awards.controller";

// SERVICES //
import { AwardsService } from "../../modules/awards/awards.service";

// MODULES //
import { DatabaseModule } from "../../core/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [AwardsController],
  providers: [AwardsService],
})
export class AwardsModule {}
