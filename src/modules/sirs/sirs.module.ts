// CORE //
import { Module } from "@nestjs/common";

// CONTROLLERS //
import { SirsController } from "./sirs.controller";

// SERVICES //
import { SirsService } from "./sirs.service";

// MODULES //
import { DatabaseModule } from "../../core/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [SirsController],
  providers: [SirsService],
})
export class SirsModule {}
