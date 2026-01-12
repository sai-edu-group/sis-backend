// CORE //
import { Module } from "@nestjs/common";

// CONTROLLERS //
import { BlogsController } from "./blogs.controller";

// SERVICES //
import { BlogsService } from "./blogs.service";

// MODULES //
import { DatabaseModule } from "../../core/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
