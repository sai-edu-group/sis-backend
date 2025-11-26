// CORE
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/core/database/database.module';   // <- important

// CONTROLLERS & SERVICES //
import { StudentCouncilController } from './student-council.controller';
import { StudentCouncilService } from './student-council.service';

@Module({
  imports: [DatabaseModule],   
  controllers: [StudentCouncilController],
  providers: [StudentCouncilService],
})
export class StudentCouncilModule {}
