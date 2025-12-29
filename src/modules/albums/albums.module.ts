// CONTROLLERS //
import { AlbumsController } from "../../modules/albums/albums.controller";

// SERVICES //
import { AlbumsService } from "../../modules/albums/albums.service";

// MODULES //
import { DatabaseModule } from "../../core/database/database.module";

// OTHERS //
import { Module } from "@nestjs/common";

@Module({
  imports: [DatabaseModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
