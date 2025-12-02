// CONTROLLERS //
import { AppController } from "@/app.controller";

// SERVICES //
import { AppService } from "@/app.service";

// MODULES //
import { Module } from "@nestjs/common";
import { ContactModule } from "@/modules/contacts/contact.module";
import { DatabaseModule } from "@/core/database/database.module";
import { ConfigModule } from "@nestjs/config";
import { StudentCouncilModule } from "./modules/student-council/student-council.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ContactModule,
    DatabaseModule,
    StudentCouncilModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
