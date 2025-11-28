// MODULES //
import { PressReleasesController } from "@/modules/press-releases/press-releases.controller";
import { PressReleasesService } from "@/modules/press-releases/press-releases.service";
import { DatabaseModule } from "@/core/database/database.module";

// OTHERS //
import { Module } from "@nestjs/common";

@Module({
  imports: [DatabaseModule],
  controllers: [PressReleasesController],
  providers: [PressReleasesService],
})
export class PressReleasesModule {}
