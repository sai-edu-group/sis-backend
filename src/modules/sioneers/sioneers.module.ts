// CORE //
// MODULES //
import { DatabaseModule } from "@/core/database/database.module";

// CONTROLLERS //
import { SioneersController } from "./sioneers.controller";

// SERVICES //
import { SioneersService } from "./sioneers.service";

// OTHERS //
import { Module } from "@nestjs/common";

@Module({
  imports: [DatabaseModule],
  controllers: [SioneersController],
  providers: [SioneersService],
})
export class SioneersModule {}
