// CORE //
import { Module } from '@nestjs/common';
// SERVICES & CONTROLLERS //
import { SioneersController } from './sioneers.controller';
import { SioneersService } from './sioneers.service';
import { DatabaseModule } from '@/core/database/database.module';

@Module({
     imports: [DatabaseModule],
    controllers:[SioneersController],
    providers:[SioneersService],
})
export class SioneersModule {}