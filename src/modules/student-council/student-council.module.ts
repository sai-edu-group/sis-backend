// CORE //
import { Module } from "@nestjs/common";

// SERVICES //
import { StudentCouncilService } from "@/modules/student-council/student-council.service";

// MODULES //
import { DatabaseModule } from "@/core/database/database.module";

// CONTROLLERS //
import { StudentCouncilController } from "@/modules/student-council/student-council.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [StudentCouncilController],
  providers: [StudentCouncilService],
})
export class StudentCouncilModule {}
