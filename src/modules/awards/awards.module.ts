import { Module } from "@nestjs/common";
import { AwardsController } from "./awards.controller";
import { AwardsService } from "./awards.service";
import { DatabaseModule } from "@/core/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [AwardsController],
  providers: [AwardsService],
})
export class AwardsModule {}
