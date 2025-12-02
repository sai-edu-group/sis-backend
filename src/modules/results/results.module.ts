// MODULES //
import { ResultsService } from '@/modules/results/results.service';
import { ResultsController } from '@/modules/results/results.controller';

// OTHERS //
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/core/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
