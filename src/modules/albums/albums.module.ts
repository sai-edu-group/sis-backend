// CORE //
import { Module } from "@nestjs/common";

// CONTROLLERS //
import { AlbumsController } from "./albums.controller";

// SERVICES //
import { AlbumsService } from "./albums.service";

// MODULES //
import { DatabaseModule } from "../../core/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
