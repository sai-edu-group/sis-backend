// CONTROLLERS //
import { AppController } from "@/app.controller";

// SERVICES //
import { AppService } from "@/app.service";

// MODULES //
import { Module } from "@nestjs/common";
import { ContactModule } from "@/modules/contacts/contact.module";
import { DatabaseModule } from "@/core/database/database.module";
import { AwardsModule } from "./modules/awards/awards.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ContactModule, DatabaseModule, AwardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
